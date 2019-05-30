import { Router } from 'express';
import ToggleModel from '../models/toggle';

const toggleController = Router();

toggleController

    .get('/:id', (req, res, next) => {
        console.log('daaa');
        ToggleModel.findOne({_id: req.params.id}, (err, toggles) => {
            console.log(toggles)
            res.json(toggles);
        });
    })

    .get('/', (req, res, next) => {
        console.log('daaa');
        ToggleModel.find({}, (err, toggles) => {
            console.log(toggles)
            res.json(toggles);
        });
    })

    .post('/', (req, res, next) => {
        const toggle = req.body;
        ToggleModel.create(toggle)
            .then(t => res.json(t))
            .catch(err => res.json(err));
    })

    .put('/:id', (req, res, next) => {
        const toggle = req.body;
        ToggleModel.findOneAndUpdate({_id: req.params.id}, toggle)
        // .then( oldToggle => findOne({_id: oldToggle._id})
        .then(t => res.json(t))
            .catch(err => res.json(err));
    })

    .delete('/:id', (req, res, next) => {
        const toggle = req.body;
        ToggleModel.findOneAndDelete({_id: req.params.id}, toggle)
            .then( oldToggle => res.json(oldToggle))
            .catch(err => res.json(err));
    })

export default toggleController;