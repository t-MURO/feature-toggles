import { Router } from "express";
import Feature from "../models/domain/Feature";
import FeatureService from "../services/FeatureService";
import CustomRequest from "../models/interfaces/CustomRequest";
import { updateFeaturesThroughWebSocket } from "../socket";
import { notifyServersAfterChangedFeature } from "../services/ToggleService";

const featureController = Router();
const featureService = new FeatureService();

featureController

  .get("/:id", (req, res, next) => {
    featureService
      .findOne(req.params.id)
      .then(feature => res.json(feature))
      .catch(err => res.json(err));
  })

  .get("/", (req, res, next) => {
    featureService
      .findAll()
      .then(features => {
        res.json(features);
      })
      .catch(err => res.json(err));
  })

  .post("/", (req: CustomRequest, res, next) => {
    let newFeature: Feature = req.body;
    const user = (req.user && req.user.email) || "Unknown";
    newFeature.createdBy = user;
    newFeature.updatedBy = user;
    featureService
      .create(newFeature)
      .then((feature: Feature) => res.json(feature))
      .catch((err: Error) => res.status(400).send(err));
  })

  .put("/:id", async (req: CustomRequest, res, next) => {
    let newFeature: Feature = req.body;
    newFeature.updatedBy = (req.user && req.user.email) || "Unknown";
    req.body._id = req.params.id;

    const oldFeature: Feature = await featureService.findOne(req.body._id);
    // const changedEnabledStatus = oldFeature.isEnabled !== newFeature.isEnabled;
    featureService
      .update(newFeature)
      .then(feature => {
        res.status(200).json(feature)
        updateFeaturesThroughWebSocket();
        notifyServersAfterChangedFeature(newFeature);
        // if(changedEnabledStatus) {
        // }
      })
      .catch(err => res.status(400).json(err));
  })

  .delete("/remove/:id", async (req, res, next) => {
    featureService
      .remove(req.params.id)
      .then(feature => res.json(feature))
      .catch(err => res.status(400).json(err));
  })

  .delete("/:id", (req: CustomRequest, res, next) => {
    featureService
      .delete(req.params.id)
      .then(feature => res.json(feature))
      .catch((err: Error) => res.status(400).json(err));
  });

export default featureController;
