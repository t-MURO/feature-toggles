import { Router } from 'express';
import { getToggles } from '../services/ToggleService';

const toggleController = Router();

toggleController.post('/:identifier', async (req, res, next) => {
    try {
        const features = await getToggles(req.params.identifier);
        return res.json({features});
    } catch (e) {
        console.log(e);
        return res.send(400);
    }
});

export default toggleController;