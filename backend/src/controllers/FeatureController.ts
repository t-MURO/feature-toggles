import { Router } from 'express';
import Feature from '../models/Feature';
import FeatureService from '../services/FeatureService';

const featureController = Router();
const featureService = new FeatureService();

featureController

    .get('/:id', (req, res, next) => {
        featureService.findOneById(req.params.id)
            .then(feature => res.json(feature))
            .catch(err => res.json(err));
    })

    .get('/', (req, res, next) => {
        featureService.findAll()
            .then(feature => res.json(feature))
            .catch(err => res.json(err));
    })

    .post('/', (req, res, next) => {
        featureService.create(req.body)
            .then((feature:Feature) => res.json(feature))
            .catch((err:Error) => res.status(400).send(err))
    })

    .put('/:id', (req, res, next) => {
        featureService.update(req.params.id, req.body)
            .then(feature => res.status(200).json(feature))
            .catch(err => res.status(400).json(err));
    })

    .delete('/:id', (req, res, next) => {
        featureService.delete(req.params.id)
            .then(() => res.send(204))
            .catch((err:Error) => res.status(400).json(err))
    })

export default featureController;