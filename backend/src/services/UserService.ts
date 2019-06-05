import UserModel from '../models/mongoose/UserModel';
import User from '../models/domain/User';
import { Error } from 'mongoose';

export default class UserService {

    public findOneById(_id: string):Promise<User|Error>{
        return new Promise((resolve, reject) => UserModel.findById(_id, (err:Error, user:User) => err ? reject(err) : resolve(user)));
    }

    public findAll():Promise<User[]|Error>{
        return new Promise((resolve, reject) => UserModel.find({}, (err:Error, users:User[]) => err ? reject(err) : resolve(users)));
    }

    public create(users:User|User[]):Promise<any>{
        return new Promise((resolve, reject) => {
            UserModel.create(users)
                .then((t:User|User[]) => resolve(t))
                .catch((err:Error) => reject(err));
        });
    }

    public update(_id: string, user: User):Promise<any>{
        return new Promise((resolve, reject) => {
            UserModel.findOneAndUpdate({_id}, user)
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