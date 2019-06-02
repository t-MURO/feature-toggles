import { Router } from 'express';
import Toggle from '../models/Toggle';
import ToggleService from '../services/ToggleService';

const toggleController = Router();
const toggleService = new ToggleService();

toggleController

    .get('/:id', (req, res, next) => {
        toggleService.findOneById(req.params.id)
            .then(toggle => res.json(toggle))
            .catch(err => res.json(err));
    })

    .get('/', (req, res, next) => {
        toggleService.findAll()
            .then(toggles => res.json(toggles))
            .catch(err => res.json(err));
    })

    .post('/', (req, res, next) => {
        toggleService.create(req.body)
            .then((toggle:Toggle) => res.json(toggle))
            .catch((err:Error) => res.status(400).send(err))
    })

    .put('/:id', (req, res, next) => {
        toggleService.update(req.params.id, req.body)
            .then(toggle => res.status(200).json(toggle))
            .catch(err => res.status(400).json(err));
    })

    .delete('/:id', (req, res, next) => {
        toggleService.delete(req.params.id)
            .then(() => res.send(204))
            .catch((err:Error) => res.status(400).json(err))
    })


export default toggleController;