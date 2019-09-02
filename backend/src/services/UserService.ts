import UserModel from '../models/mongoose/UserModel';
import User from '../models/domain/User';
import { Error } from 'mongoose';
import {MongoError} from "mongodb";
import MongoRepository from "../models/interfaces/repository";

export default class UserService implements MongoRepository<User> {

    public findOneByEmail(email: string):Promise<User>{
        return new Promise((resolve, reject) => {
            UserModel.findOne({email: email.trim().toLowerCase()}, (err:Error, user: User) => err ? reject(err) : resolve(user));
        });
    }

    public findOne(_id: string):Promise<User>{
        return new Promise((resolve, reject) => UserModel.findById(_id, (err:Error, user:User) => err ? reject(err) : resolve(user)));
    }

    public findAll():Promise<User[]>{
        return new Promise((resolve, reject) => UserModel.find({}, (err:Error, users:User[]) => err ? reject(err) : resolve(users)));
    }

    public create(users:User|User[]):Promise<any>{
        return new Promise((resolve, reject) => {
            UserModel.create(users)
                .then((t:User|User[]) => resolve(t))
                .catch((err:MongoError) => reject(err));
        });
    }

    public update(user: User):Promise<any>{
        return new Promise((resolve, reject) => {
            UserModel.findOneAndUpdate({_id: user._id}, user)
                .then((t:any) => resolve(t))
                .catch((err:Error) => reject(err))
        });
    }

    public delete(_id:string):Promise<any>{
        return new Promise((resolve, reject) => {
            UserModel.findOneAndDelete({_id})
                .then( () => resolve())
                .catch((err: any) => reject(err));
        });
    }

    // for testing purposes
    public deleteAll():Promise<string>{
        return new Promise(resolve => {
           UserModel.collection.drop(() => {
               resolve("All users deleted.")
           })
        });
    }
}