import { Router } from 'express';
import Feature from '../models/domain/Feature';
import FeatureService from '../services/FeatureService';
import EnvironmentService from '../services/EnvironmentService';
import Environment from '../models/domain/Environment';

const toggleController = Router();
const featureService = new FeatureService();
const environmentService = new EnvironmentService();

toggleController.post('/:identifier', async (req, res, next) => {
    try {
        const environment:Environment = await environmentService.findOneByIdentifier(req.params.identifier);
        const features:Feature[] = await featureService.findAll({_id: {$in: environment.features}});
        const enabledFeatures: string[] = features.filter(f => f.isEnabled).map(f => f.name);
        return res.json({features: enabledFeatures});
    } catch (e) {
        console.log(e);
        return res.send(400);
    }
});

export default toggleController;