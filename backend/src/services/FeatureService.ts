import FeatureModel from '../mongoose-models/FeatureModel';
import Feature from '../models/Feature';
import { Error } from 'mongoose';

export default class FeatureService {

    public findOneById(_id: string):Promise<Feature|Error>{
        return new Promise((resolve, reject) => FeatureModel.findById(_id, (err:Error, feature:Feature) => err ? reject(err) : resolve(feature)));
    }

    public findAll():Promise<Feature[]|Error>{
        return new Promise((resolve, reject) => FeatureModel.find({}, (err:Error, features:Feature[]) => err ? reject(err) : resolve(features)));
    }

    public create(features:Feature|Feature[]):Promise<any>{
        return new Promise((resolve, reject) => {
            FeatureModel.create(features)
                .then((t) => resolve(t))
                .catch((err:Error) => reject(err));
        });
    }

    public update(_id: string, feature: Feature):Promise<any>{
        return new Promise((resolve, reject) => {
            FeatureModel.findOneAndUpdate({_id}, feature)
                .then(t => resolve(t))
                .catch((err:Error) => reject(err))
        });
    }

    public delete(_id:string):Promise<any>{
        return new Promise((resolve, reject) => {
            FeatureModel.findOneAndDelete({_id})
                .then( () => resolve())
                .catch(err => reject(err));
        });
    }
}