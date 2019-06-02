import { Router } from 'express';
import EnvironmentService from '../services/EnvironmentService';
import Environment from '../models/Environment';

const environmentController = Router();
const environmentService = new EnvironmentService();

environmentController

    .get('/:id', (req, res, next) => {
        environmentService.getEnvironment(req.params.id)
            .then(environment => res.json(environment))
            .catch(err => res.json(err));
    })

    .get('/', (req, res, next) => {
        environmentService.getEnvironments()
            .then(environments => res.json(environments))
            .catch(err => res.json(err));
    })

    .post('/', (req, res, next) => {
        environmentService.createEnvironment(req.body)
            .then((environment:Environment) => res.json(environment))
            .catch((err:Error) => res.status(400).send(err))
    })

    .put('/:id', (req, res, next) => {
        environmentService.updateEnvironment(req.params.id, req.body)
            .then(environment => res.status(200).json)
            .catch(err => res.status(400).json(err));
    })

    .delete('/:id', (req, res, next) => {
        environmentService.deleteEnvironment(req.params.id)
            .then(() => res.send(204))
            .catch((err:Error) => res.status(400).json(err))
    })


export default environmentController;