import EnvironmentModel from '../models/mongoose/EnvironmentModel';
import Environment from '../models/domain/Environment';
import { Error } from 'mongoose';
import IService from "../models/interfaces/IService";
import { sendFeaturesToServer } from './ToggleService';
import FeatureToggle from '../models/domain/FeatureToggle';
import { updateFeaturesThroughWebSocket } from './WebSocketService';

export default class EnvironmentService implements IService<Environment>{

    public findOne(_id: string):Promise<Environment>{
        return new Promise((resolve, reject) => EnvironmentModel.findOne({_id}, (err:Error, environment:Environment) => err ? reject(err) : resolve(environment)));
    }

    public findOneByIdentifier(identifier: string|any):Promise<Environment> {
        return new Promise((resolve, reject) => EnvironmentModel.findOne({identifier}, (err:Error, environment:Environment) => err ? reject(err) : resolve(environment)));
    }

    public findAll(conditions?: any):Promise<Environment[]>{
        conditions = conditions || {};
        return new Promise((resolve, reject) => EnvironmentModel.find(conditions, (err:Error, environments:Environment[]) => err ? reject(err) : resolve(environments)));
    }

    public create(environment:Environment):Promise<any>{
        return new Promise((resolve, reject) => {
            EnvironmentModel.create(environment)
                .then((env) => resolve(env))
                .catch((err:Error) => reject(err));
        });
    }

    public update(environment: Environment):Promise<any>{
        environment.featureToggles = [...new Set(environment.featureToggles)]; // TODO: see if this is necessary, maybe implement validation fn in model
        return new Promise((resolve, reject) => {
            EnvironmentModel.findOneAndUpdate({_id: environment._id}, environment, {new: true})
                .then(t => {
                    updateFeaturesThroughWebSocket();
                    sendFeaturesToServer(environment);
                    resolve(t)
                })
                .catch((err:Error) => reject(err))
        });
    }

    public delete(_id:string):Promise<any>{
        return new Promise((resolve, reject) => {
            EnvironmentModel.findOneAndDelete({_id})
                .then((res) => resolve(res))
                .catch(err => reject(err));
        });
    }

    public findAllThatContainFeature(featureToggle: FeatureToggle): Promise<Environment[]> {
        return this.findAll({ featureToggles: featureToggle._id });
    }
    
}