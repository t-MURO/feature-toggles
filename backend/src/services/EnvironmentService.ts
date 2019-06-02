import EnvironmentModel from '../mongoose-models/EnvironmentModel';
import Environment from '../models/Environment';
import { Error } from 'mongoose';

export default class EnvironmentService {

    public getEnvironment(_id: string):Promise<Environment|Error>{
        return new Promise((resolve, reject) => EnvironmentModel.findOne({_id}, (err:Error, environment:Environment) => err ? reject(err) : resolve(environment)));
    }

    public getEnvironments():Promise<Environment[]|Error>{
        return new Promise((resolve, reject) => EnvironmentModel.find({}, (err:Error, environments:Environment[]) => err ? reject(err) : resolve(environments)));
    }

    public createEnvironment(environment:Environment):Promise<any>{
        return new Promise((resolve, reject) => {
            EnvironmentModel.create(environment)
                .then((t) => resolve(t))
                .catch((err:Error) => reject(err));
        });
    }

    public updateEnvironment(_id: string, environment: Environment):Promise<any>{
        return new Promise((resolve, reject) => {
            EnvironmentModel.findOneAndUpdate({_id}, environment)
                .then(t => resolve(t))
                .catch((err:Error) => reject(err))
        });
    }

    public deleteEnvironment(_id:string):Promise<any>{
        return new Promise((resolve, reject) => {
            EnvironmentModel.findOneAndDelete({_id})
                .then(() => resolve())
                .catch(err => reject(err));
        });
    }
    
}