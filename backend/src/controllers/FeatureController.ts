import { Router } from "express";
import FeatureToggle from "../models/domain/FeatureToggle";
import FeatureToggleService from "../services/FeatureToggleService";
import CustomRequest from "../models/interfaces/CustomRequest";
import ToggleService from "../services/ToggleService";

const featureController = Router();
const featureToggleService = new FeatureToggleService();
const toggleService = new ToggleService();

featureController

  .get("/:id", (req, res, next) => {
    featureToggleService
      .findOne(req.params.id)
      .then(feature => res.json(feature))
      .catch(err => res.json(err));
  })

  .get("/", (req, res, next) => {
    featureToggleService
      .findAll()
      .then(features => {
        res.json(features);
      })
      .catch(err => res.json(err));
  })

  .post("/", (req: CustomRequest, res, next) => {
    let newFeature: FeatureToggle = req.body;
    const user = (req.user && req.user.email) || "Unknown";
    newFeature.createdBy = user;
    newFeature.updatedBy = user;
    featureToggleService
      .create(newFeature)
      .then((feature: FeatureToggle) => res.json(feature))
      .catch((err: Error) => res.status(400).send(err));
  })

  .put("/:id", async (req: CustomRequest, res, next) => {
    let newFeatureToggle: FeatureToggle = req.body;
    newFeatureToggle.updatedBy = (req.user && req.user.email) || "Unknown";
    req.body._id = req.params.id;

    featureToggleService
      .update(newFeatureToggle)
      .then(featureToggle => res.status(200).json(featureToggle))
      .catch(err => res.status(400).json(err));
  })

  .delete("/remove/:id", async (req, res, next) => {
    featureToggleService
      .remove(req.params.id)
      .then(feature => res.json(feature))
      .catch(err => res.status(400).json(err));
  })

  .delete("/:id", (req: CustomRequest, res, next) => {
    featureToggleService
      .delete(req.params.id)
      .then(feature => res.json(feature))
      .catch((err: Error) => res.status(400).json(err));
  });

export default featureController;
