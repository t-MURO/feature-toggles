import { Router } from 'express';
import EnvironmentService from '../services/EnvironmentService';
import Environment from '../models/domain/Environment';

const environmentController = Router();
const environmentService = new EnvironmentService();

environmentController

    .get('/:id', (req, res, next) => {
        environmentService.findOne(req.params.id)
            .then(environment => res.json(environment))
            .catch(err => res.json(err));
    })

    .get('/', (req, res, next) => {
        environmentService.findAll()
            .then(environments => res.json(environments))
            .catch(err => res.json(err));
    })

    .post('/', (req, res, next) => {
        environmentService.create(req.body)
            .then((environment:Environment) => res.json(environment))
            .catch((err:Error) => res.status(400).send(err))
    })

    .put('/:id', (req, res, next) => {
        req.body._id = req.params.id;
        environmentService.update(req.body)
            .then(environment => res.status(200).json)
            .catch(err => res.status(400).json(err));
    })

    .delete('/:id', (req, res, next) => {
        environmentService.delete(req.params.id)
            .then(() => res.sendStatus(204))
            .catch((err:Error) => res.status(400).json(err))
    })


export default environmentController;