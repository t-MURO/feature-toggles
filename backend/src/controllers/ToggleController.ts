import { Router } from 'express';
import { getToggles, getTogglesWithoutOptions } from '../services/ToggleService';

const toggleController = Router();

toggleController.post('/:identifier', async (req, res, next) => {
    try {
        const features = await getToggles(req.params.identifier, req.body);
        return res.send(features);
    } catch (e) {
        console.log(e);
        return res.send(400);
    }
});

toggleController.get('/:identifier', async (req, res, next) => {
    try {
        const features = await getTogglesWithoutOptions(req.params.identifier);
        return res.send(features);
    } catch (e) {
        console.log(e);
        return res.send(400);
    }
});

export default toggleController;