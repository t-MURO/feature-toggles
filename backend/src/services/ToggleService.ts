import crypto from "crypto";
import fetch from "node-fetch";
import { Rule } from "./../models/domain/Rule";
import Environment from "../models/domain/Environment";
import EnvironmentService from "./EnvironmentService";
import FeatureToggleService from "./FeatureToggleService";
import FeatureToggle, { FeatureStatus } from "../models/domain/FeatureToggle";
import RequestOptions from "../models/transfer/RequestOptions";

const environmentService = new EnvironmentService();
const featureToggleService = new FeatureToggleService();

export default class ToggleService {

  public getTogglesWithoutOptions = async (identifier: string): Promise<string[]> => {
    const environment = await environmentService.findOneByIdentifier(identifier);
    if (!environment) {
      console.log(`Environment with identifier: ${identifier} was not found, returning empty array`);
      return [];
    }
    const featureToggles: FeatureToggle[] = await featureToggleService.findAllFeatureTogglesForEnvironment(environment);
    return featureToggles.filter(ft => ft.isEnabled && ft.status === FeatureStatus.ACTIVE).map(ft => ft.name);
  }

  public getToggles = async (identifier: string, requestOptions?: RequestOptions): Promise<string[]> => {

    try {
      const environment: Environment = await environmentService.findOneByIdentifier(
        identifier
      );
      const featureToggles: FeatureToggle[] = await featureToggleService.findAllFeatureTogglesForEnvironment(environment);
      const enabledFeatureToggles: FeatureToggle[] = featureToggles.filter(
        ft => ft.isEnabled && ft.status === FeatureStatus.ACTIVE
      );

      const featureToggleIdsWithRules: string[] = [];

      environment.rules.forEach(rule =>
        featureToggleIdsWithRules.push(...rule.featureIds)
      );

      return enabledFeatureToggles
        .filter(enabledFeatureToggle => {
          if (!featureToggleIdsWithRules.includes(`${enabledFeatureToggle._id}`)) {
            return true;
          } else {
            const rules = this.getRulesForFeatureToggle(enabledFeatureToggle, environment.rules);
            console.log(
              `rules for ${enabledFeatureToggle.name} : ${rules.map(r => r.name)}`
            );
            if (rules.every(rule => this.evaluate(rule, requestOptions))) {
              return true;
            }
          }
          return false;
        })
        .map(featureToggle => featureToggle.name);
    } catch (e) {
      throw new Error(e);
    }
  };

  private getRulesForFeatureToggle = (feature: FeatureToggle, rules: Rule[]): Rule[] => {
    return rules.filter(rule => rule.featureIds.includes(`${feature._id}`));
  };

  private evaluate = (rule: Rule, requestOptions?: RequestOptions): boolean => {
    if (!requestOptions || !requestOptions.userGroup || !requestOptions.userId) {
      return false;
    }

    if (rule.roles.length > 0 && !rule.roles.includes(requestOptions.userGroup)) {
      console.log(
        `declining toggle - allowed roles: ${rule.roles}, given role: ${requestOptions.userGroup}`
      );
      return false;
    }

    if (rule.displayToPercentage) {
      const hash = crypto .createHash("sha256");
      const hexValue: string = hash.update(requestOptions.userId).digest("hex");
      const shortenedHexValue = hexValue.substring(0, 2);
      const decimalValue = parseInt(shortenedHexValue, 16);
      console.log(
        `displayPercentage calculation: value from id = ${decimalValue /
        2.55} | percentage: ${rule.displayToPercentage}`
      );
      if (decimalValue > rule.displayToPercentage * 2.55) {
        return false;
      }
    }

    return true;
  };
}

export const sendFeaturesToServer = async (environment: Environment) => {
  try {
    if (!environment.serverAddress || environment.serverAddress === "") {
      return;
    }
    const featureToggles: FeatureToggle[] = await featureToggleService.findAll({
      _id: { $in: environment.featureToggles },
      isEnabled: true
    });

    await fetch(environment.serverAddress, {
      method: "POST",
      body: JSON.stringify(featureToggles.map(ft => ft.name)),
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(`successfully notified ${environment.name}`);
  } catch (e) {
    console.warn(`${environment.name} could not be reached and was not notified of changes`);
  }
}

export const notifyServersAfterChangedFeature = async (featureToggle: FeatureToggle) => {
  try {
    const environments: Environment[] = await environmentService.findAllThatContainFeature(featureToggle);
    environments
      .filter(e => e.serverAddress && e.serverAddress.length > 0)
      .forEach(async e => sendFeaturesToServer(e));
  } catch (e) {
    throw new Error(e);
  }
}

// export const getRulesForFeature = (feature: FeatureToggle, rules: Rule[]): Rule[] => {
//   return rules.filter(rule => rule.featureIds.includes(`${feature._id}`));
// };
