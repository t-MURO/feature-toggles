import FeatureModel from '../models/mongoose/FeatureModel';
import FeatureToggle, { FeatureStatus } from '../models/domain/FeatureToggle';
import { Error } from 'mongoose';
import IService from "../models/interfaces/IService";

export default class FeatureToggleService implements IService<FeatureToggle>{

    public findOne(_id: string):Promise<FeatureToggle>{
        return new Promise((resolve, reject) => FeatureModel.findById(_id, (err:Error, feature:FeatureToggle) => err ? reject(err) : resolve(feature)));
    }

    public findAll(conditions?:any):Promise<FeatureToggle[]>{
        return new Promise((resolve, reject) => FeatureModel.find(conditions || {}, (err:Error, features:FeatureToggle[]) => err ? reject(err) : resolve(features)));
    }

    public create(features:FeatureToggle|FeatureToggle[]):Promise<any>{
        return new Promise((resolve, reject) => {
            FeatureModel.create(features)
                .then((t:FeatureToggle|FeatureToggle[]) => resolve(t))
                .catch((err:Error) => reject(err));
        });
    }

    public update(feature: FeatureToggle):Promise<FeatureToggle>{
        return new Promise((resolve, reject) => {
            FeatureModel.findOneAndUpdate({_id: feature._id}, feature, {new: true})
                .then((t:any) => resolve(t))
                .catch((err:Error) => reject(err))
        });
    }

    
    public remove(_id:string):Promise<FeatureToggle> {
        return new Promise(async (resolve, reject) => {
            try {
                let feature: FeatureToggle = await this.findOne(_id);
                feature.status = FeatureStatus.DELETED;
                feature.isEnabled = false;
                feature = await this.update(feature);
                resolve(feature);
            } catch (e) {
                reject(e);
            }
        });
    }

    public delete(_id:string):Promise<any>{
        return new Promise((resolve, reject) => {
            FeatureModel.findOneAndDelete({_id})
                .then( () => resolve())
                .catch((err: any) => reject(err));
        });

    }
}