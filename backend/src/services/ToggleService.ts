import Environment from "../models/domain/Environment"
import EnvironmentService from "./EnvironmentService"
import FeatureService from "./FeatureService";
import Feature from "../models/domain/Feature";

const environmentService = new EnvironmentService();
const featureService = new FeatureService();

export const getToggles = async (environmentId: string): Promise<string[]> => {
    try {
        const environment: Environment = await environmentService.findOneByIdentifier(environmentId);
        const features: Feature[] = await featureService.findAll({_id: {$in: environment.features}})
        const enabledFeatures: string[] = features.filter(f => f.isEnabled).map(f => f.name);
        return enabledFeatures;
    } catch (e) {
        throw new Error(e);
    }
}