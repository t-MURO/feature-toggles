import fetch from "node-fetch";
import { Rule, evaluate } from "./../models/domain/Rule";
import Environment from "../models/domain/Environment";
import EnvironmentService from "./EnvironmentService";
import FeatureService from "./FeatureService";
import FeatureToggle, { FeatureStatus } from "../models/domain/FeatureToggle";
import RequestOptions from "../models/transfer/RequestOptions";

const environmentService = new EnvironmentService();
const featureService = new FeatureService();

export default class ToggleService {

  public getTogglesWithoutOptions = async (identifier: string): Promise<string[]> => {
    const environment = await environmentService.findOneByIdentifier(identifier);
    const features: FeatureToggle[] = await featureService.findAll({
      _id: { $in: environment.features }
    });
    return features.filter(f => f.isEnabled && f.status === FeatureStatus.ACTIVE).map(f => f.name);
  }

  public getToggles = async (
    identifier: string,
    requestOptions?: RequestOptions
  ): Promise<string[]> => {
    try {
      const environment: Environment = await environmentService.findOneByIdentifier(
        identifier
      );
      const features: FeatureToggle[] = await featureService.findAll({
        _id: { $in: environment.features }
      });
      const enabledFeatureToggles: FeatureToggle[] = features.filter(
        f => f.isEnabled && f.status !== FeatureStatus.DELETED
      );

      const featureIdsWithRules: string[] = [];

      environment.rules.forEach(rule =>
        featureIdsWithRules.push(...rule.featureIds)
      );

      if (!requestOptions) {
        console.log("no request options");
        // only return features which have no rules
        return enabledFeatureToggles
          .filter(featureToggle => !featureIdsWithRules.includes(`${featureToggle._id}`))
          .map(ft => ft.name);
      }

      return enabledFeatureToggles
        .filter(enabledFeatureToggle => {
          if (!featureIdsWithRules.includes(`${enabledFeatureToggle._id}`)) {
            return true;
          } else {
            const rules = this.getRulesForFeatureToggle(enabledFeatureToggle, environment.rules);
            console.log(
              `rules for ${enabledFeatureToggle.name} : ${rules.map(r => r.name)}`
            );
            if (rules.every(rule => evaluate(rule, requestOptions))) {
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


  public sendFeaturesToServer = async (environment: Environment) => {
    try {
      if (!environment.serverAddress || environment.serverAddress === "") {
        return;
      }
      const featureToggles: FeatureToggle[] = await featureService.findAll({
        _id: { $in: environment.features },
        isEnabled: true
      });

      await fetch(environment.serverAddress, {
        method: "POST",
        body: JSON.stringify(featureToggles.map(f => f.name)),
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(`successfully notified ${environment.name}`);
    } catch (e) {
      console.warn(`${environment.name} could not be reached and was not notified of changes`);
    }
  }

  public notifyServersAfterChangedFeature = async (featureToggle: FeatureToggle) => {
    try {
      const environments: Environment[] = await environmentService.findAll({
        features: featureToggle._id
      });
      environments.forEach(async e => this.sendFeaturesToServer(e));
    } catch (e) {
      throw new Error(e);
    }
  }

  public getRulesForFeatureToggle = (feature: FeatureToggle, rules: Rule[]): Rule[] => {
    return rules.filter(rule => rule.featureIds.includes(`${feature._id}`));
  };

}

// export const getTogglesWithoutOptions = async (identifier: string): Promise<string[]> => {
//   const environment = await environmentService.findOneByIdentifier(identifier);
//   const features: FeatureToggle[] = await featureService.findAll({
//     _id: { $in: environment.features }
//   });
//   return features.filter(f => f.isEnabled && f.status === FeatureStatus.ACTIVE).map(f => f.name);
// }

// export const getToggles = async (
//   identifier: string,
//   requestOptions?: RequestOptions
// ): Promise<string[]> => {
//   try {
//     const environment: Environment = await environmentService.findOneByIdentifier(
//       identifier
//     );
//     const features: FeatureToggle[] = await featureService.findAll({
//       _id: { $in: environment.features }
//     });
//     const enabledFeatures: FeatureToggle[] = features.filter(
//       f => f.isEnabled && f.status !== FeatureStatus.DELETED
//     );

//     const featureIdsWithRules: string[] = [];

//     environment.rules.forEach(rule =>
//       featureIdsWithRules.push(...rule.featureIds)
//     );

//     if (!requestOptions) {
//       console.log("no request options");
//       // only return features which have no rules
//       return enabledFeatures
//         .filter(feature => !featureIdsWithRules.includes(`${feature._id}`))
//         .map(f => f.name);
//     }

//     return enabledFeatures
//       .filter(enabledFeature => {
//         if (!featureIdsWithRules.includes(`${enabledFeature._id}`)) {
//           return true;
//         } else {
//           const rules = getRulesForFeature(enabledFeature, environment.rules);
//           console.log(
//             `rules for ${enabledFeature.name} : ${rules.map(r => r.name)}`
//           );
//           if (rules.every(rule => evaluate(rule, requestOptions))) {
//             return true;
//           }
//         }
//         return false;
//       })
//       .map(feature => feature.name);
//   } catch (e) {
//     throw new Error(e);
//   }
// };


// export const sendFeaturesToServer = async (environment: Environment) => {
//   try {
//     if (!environment.serverAddress || environment.serverAddress === "") {
//       return;
//     }
//     const featureToggles: FeatureToggle[] = await featureService.findAll({
//       _id: { $in: environment.features },
//       isEnabled: true
//     });

//     await fetch(environment.serverAddress, {
//       method: "POST",
//       body: JSON.stringify(featureToggles.map(f => f.name)),
//       headers: { 'Content-Type': 'application/json' }
//     });
//     console.log(`successfully notified ${environment.name}`);
//   } catch (e) {
//     console.warn(`${environment.name} could not be reached and was not notified of changes`);
//   }
// }

// export const notifyServersAfterChangedFeature = async (feature: FeatureToggle) => {
//   try {
//     const environments: Environment[] = await environmentService.findAll({
//       features: feature._id
//     });
//     environments.forEach(async e => sendFeaturesToServer(e));
//   } catch (e) {
//     throw new Error(e);
//   }
// }

// export const getRulesForFeature = (feature: FeatureToggle, rules: Rule[]): Rule[] => {
//   return rules.filter(rule => rule.featureIds.includes(`${feature._id}`));
// };
