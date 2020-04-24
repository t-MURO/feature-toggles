import { Router } from "express";
import EnvironmentService from "../services/EnvironmentService";
import Environment from "../models/domain/Environment";
import CustomRequest from "../models/interfaces/CustomRequest";
import ToggleService from "../services/ToggleService";

const environmentController = Router();
const environmentService = new EnvironmentService();
const toggleService = new ToggleService();

environmentController

  .get("/:id", (req, res, next) => {
    environmentService
      .findOne(req.params.id)
      .then(environment => res.json(environment))
      .catch(err => res.json(err));
  })

  .get("/", (req, res, next) => {
    environmentService
      .findAll()
      .then(environments => res.json(environments))
      .catch(err => res.json(err));
  })

  .post("/", (req: CustomRequest, res, next) => {
    let newEnvironment: Environment = req.body;
    const user = (req.user && req.user.email) || "Unknown";
    newEnvironment.createdBy = user;
    newEnvironment.updatedBy = user;
    environmentService
      .create(newEnvironment)
      .then((environment: Environment) => res.json(environment))
      .catch((err: Error) => res.status(400).send(err));
  })

  .put("/:id", (req: CustomRequest, res, next) => {
    let newEnvironment: Environment = req.body;
    newEnvironment._id = req.params.id;
    newEnvironment.updatedBy = (req.user && req.user.email) || "Unknown";
    environmentService
      .update(newEnvironment)
      .then(environment => res.status(200).json(environment))
      .catch(err => res.status(400).json(err));
  })

  .delete("/:id", (req: CustomRequest, res, next) => {
    environmentService
      .delete(req.params.id)
      .then(() => res.sendStatus(204))
      .catch((err: Error) => res.status(400).json(err));
  });

export default environmentController;
