import { Router } from 'express';
import ToggleService from '../services/ToggleService';

const toggleService = new ToggleService();

const toggleController = Router();

toggleController.post('/:identifier', async (req, res, next) => {
    try {
        const features = await toggleService.getToggles(req.params.identifier, req.body);
        return res.send(features);
    } catch (e) {
        console.log(e);
        return res.send(400);
    }
});

toggleController.get('/:identifier', async (req, res, next) => {
    try {
        const features = await toggleService.getTogglesWithoutOptions(req.params.identifier);
        return res.send(features);
    } catch (e) {
        console.log(e);
        return res.send(400);
    }
});

export default toggleController;