import { Rule, evaluate } from './../models/domain/Rule';
import Environment from "../models/domain/Environment"
import EnvironmentService from "./EnvironmentService"
import FeatureService from "./FeatureService";
import Feature from "../models/domain/Feature";
import RequestOptions from "../models/transfer/RequestOptions";

const environmentService = new EnvironmentService();
const featureService = new FeatureService();

export const getToggles = async (environmentId: string, requestOptions?: RequestOptions): Promise<string[]> => {
    try {
        const environment: Environment = await environmentService.findOneByIdentifier(environmentId);
        const features: Feature[] = await featureService.findAll({_id: {$in: environment.features}})
        const enabledFeatures: Feature[] = features.filter(f => f.isEnabled);

        const featureIdsWithRules: string[] = [];

        environment.rules.forEach(rule => featureIdsWithRules.push(...rule.featureIds));

        if(!requestOptions) {
            console.log("no request options");
            return enabledFeatures.filter(feature => !featureIdsWithRules.includes(`${feature._id}`)).map(f => f.name);
        }
        return enabledFeatures.filter(enabledFeature => {
            if(!featureIdsWithRules.includes(`${enabledFeature._id}`)) {
                return true;
            } else {
                const rules = getRulesForFeature(enabledFeature, environment.rules);
                console.log(`rules for ${enabledFeature.name} : ${rules}`);
                if(rules.every(rule => evaluate(rule, requestOptions))) {
                    return true;
                }

            }
            return false;
        }).map(feature => feature.name);
    } catch (e) {
        throw new Error(e);
    }
}

export const getRulesForFeature = (feature: Feature, rules: Rule[]): Rule[] => {
    return rules.filter(rule => rule.featureIds.includes(`${feature._id}`));
}