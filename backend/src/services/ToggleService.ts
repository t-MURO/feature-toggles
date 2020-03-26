import fetch from "node-fetch";
import { Rule, evaluate } from "./../models/domain/Rule";
import Environment from "../models/domain/Environment";
import EnvironmentService from "./EnvironmentService";
import FeatureService from "./FeatureService";
import Feature, { FeatureStatus } from "../models/domain/Feature";
import RequestOptions from "../models/transfer/RequestOptions";

const environmentService = new EnvironmentService();
const featureService = new FeatureService();

export const getTogglesWithoutOptions = async (identifier: string): Promise<string[]> => {
  const environment = await environmentService.findOneByIdentifier(identifier);
  const features: Feature[] = await featureService.findAll({
    _id: { $in: environment.features }
  });
  return features.filter(f => f.isEnabled && f.status === FeatureStatus.ACTIVE).map(f => f.name);
}

export const getToggles = async (
  identifier: string,
  requestOptions?: RequestOptions
): Promise<string[]> => {
  try {
    const environment: Environment = await environmentService.findOneByIdentifier(
      identifier
    );
    const features: Feature[] = await featureService.findAll({
      _id: { $in: environment.features }
    });
    const enabledFeatures: Feature[] = features.filter(
      f => f.isEnabled && f.status !== FeatureStatus.DELETED
    );

    const featureIdsWithRules: string[] = [];

    environment.rules.forEach(rule =>
      featureIdsWithRules.push(...rule.featureIds)
    );

    if (!requestOptions) {
      console.log("no request options");
      // only return features which have no rules
      return enabledFeatures
        .filter(feature => !featureIdsWithRules.includes(`${feature._id}`))
        .map(f => f.name);
    }

    return enabledFeatures
      .filter(enabledFeature => {
        if (!featureIdsWithRules.includes(`${enabledFeature._id}`)) {
          return true;
        } else {
          const rules = getRulesForFeature(enabledFeature, environment.rules);
          console.log(
            `rules for ${enabledFeature.name} : ${rules.map(r => r.name)}`
          );
          if (rules.every(rule => evaluate(rule, requestOptions))) {
            return true;
          }
        }
        return false;
      })
      .map(feature => feature.name);
  } catch (e) {
    throw new Error(e);
  }
};


export const sendFeaturesToServer = async (environment: Environment) => {
  try {
    if (!environment.serverAddress || environment.serverAddress === "") {
      return;
    }
    const features: Feature[] = await featureService.findAll({
      _id: { $in: environment.features },
      isEnabled: true
    });

    await fetch(environment.serverAddress, {
      method: "POST",
      body: JSON.stringify(features.map(f => f.name)),
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(`successfully notified ${environment.name}`);
  } catch (e) {
    console.warn(`${environment.name} could not be reached and was not notified of changes`);
  }
}

export const notifyServersAfterChangedFeature = async (feature: Feature) => {
  try {
    const environments: Environment[] = await environmentService.findAll({
      features: feature._id
    });
    environments.forEach(async e => sendFeaturesToServer(e));
  } catch (e) {
    throw new Error(e);
  }
}

export const getRulesForFeature = (feature: Feature, rules: Rule[]): Rule[] => {
  return rules.filter(rule => rule.featureIds.includes(`${feature._id}`));
};
