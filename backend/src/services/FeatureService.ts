import FeatureModel from '../models/mongoose/FeatureModel';
import Feature, { FeatureStatus } from '../models/domain/Feature';
import { Error } from 'mongoose';
import MongoRepository from "../models/interfaces/repository";

export default class FeatureService implements MongoRepository<Feature>{

    public findOne(_id: string):Promise<Feature>{
        return new Promise((resolve, reject) => FeatureModel.findById(_id, (err:Error, feature:Feature) => err ? reject(err) : resolve(feature)));
    }

    public findAll(conditions?:any):Promise<Feature[]>{
        return new Promise((resolve, reject) => FeatureModel.find(conditions || {}, (err:Error, features:Feature[]) => err ? reject(err) : resolve(features)));
    }

    public create(features:Feature|Feature[]):Promise<any>{
        return new Promise((resolve, reject) => {
            FeatureModel.create(features)
                .then((t:Feature|Feature[]) => resolve(t))
                .catch((err:Error) => reject(err));
        });
    }

    public update(feature: Feature):Promise<Feature>{
        return new Promise((resolve, reject) => {
            FeatureModel.findOneAndUpdate({_id: feature._id}, feature, {new: true})
                .then((t:any) => resolve(t))
                .catch((err:Error) => reject(err))
        });
    }

    
    public remove(_id:string):Promise<Feature> {
        return new Promise(async (resolve, reject) => {
            try {
                let feature: Feature = await this.findOne(_id);
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