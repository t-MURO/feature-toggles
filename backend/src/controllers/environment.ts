import { Router } from 'express';
import EnvironmentModel from '../models/environment';

const EnvironmentController = Router();

EnvironmentController

    .get('/:id', (req, res, next) => {
        console.log('daaa');
        EnvironmentModel.findOne({_id: req.params.id}, (err, environment) => {
            console.log(environment)
            res.json(environment);
        });
    })

    .get('/', (req, res, next) => {
        console.log('daaa');
        EnvironmentModel.find({}, (err, environment) => {
            console.log(environment)
            res.json(environment);
        });
    })

    .post('/', (req, res, next) => {
        const toggle = req.body;
        EnvironmentModel.create(toggle)
            .then(t => res.json(t))
            .catch(err => res.json(err));
    })

    .put('/:id', (req, res, next) => {
        const toggle = req.body;
        EnvironmentModel.findOneAndUpdate({_id: req.params.id}, toggle)
            .then( t => res.json(t))
            .catch(err => res.json(err));
    })

    .delete('/:id', (req, res, next) => {
        const toggle = req.body;
        EnvironmentModel.findOneAndDelete({_id: req.params.id}, toggle)
            .then( t => res.json(t))
            .catch(err => res.json(err));
    })

export default EnvironmentController;