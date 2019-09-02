import crypto from "crypto";
import EnvironmentModel from '../models/mongoose/EnvironmentModel';
import Environment from '../models/domain/Environment';
import { Error } from 'mongoose';
import MongoRepository from "../models/interfaces/repository";

export default class EnvironmentService implements MongoRepository<Environment>{

    public findOne(_id: string):Promise<Environment|Error>{
        return new Promise((resolve, reject) => EnvironmentModel.findOne({_id}, (err:Error, environment:Environment) => err ? reject(err) : resolve(environment)));
    }

    public findAll():Promise<Environment[]|Error>{
        return new Promise((resolve, reject) => EnvironmentModel.find({}, (err:Error, environments:Environment[]) => err ? reject(err) : resolve(environments)));
    }

    public create(environment:Environment):Promise<any>{
        if(!environment.identifier || environment.identifier.trim().length <= 0) {
            environment.identifier = crypto.randomBytes(4).toString("hex");
        }
        return new Promise((resolve, reject) => {
            EnvironmentModel.create(environment)
                .then((env) => resolve(env))
                .catch((err:Error) => reject(err));
        });
    }

    public update(environment: Environment):Promise<any>{
        return new Promise((resolve, reject) => {
            EnvironmentModel.findOneAndUpdate({_id: environment._id}, environment, {new: true})
                .then(t => resolve(t))
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
    
}