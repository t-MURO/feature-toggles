import ToggleModel from '../mongoose-models/ToggleModel';
import Toggle from '../models/Toggle';
import { Error } from 'mongoose';

export default class ToggleService {

    public findOneById(_id: string):Promise<Toggle|Error>{
        return new Promise((resolve, reject) => ToggleModel.findById(_id, (err:Error, toggle:Toggle) => err ? reject(err) : resolve(toggle)));
    }

    public findAll():Promise<Toggle[]|Error>{
        return new Promise((resolve, reject) => ToggleModel.find({}, (err:Error, toggles:Toggle[]) => err ? reject(err) : resolve(toggles)));
    }

    public create(toggle:Toggle):Promise<any>{
        return new Promise((resolve, reject) => {
            ToggleModel.create(toggle)
                .then((t) => resolve(t))
                .catch((err:Error) => reject(err));
        });
    }

    public update(_id: string, toggle: Toggle):Promise<any>{
        return new Promise((resolve, reject) => {
            ToggleModel.findOneAndUpdate({_id}, toggle)
                .then(t => resolve(t))
                .catch((err:Error) => reject(err))
        });
    }

    public delete(_id:string):Promise<any>{
        return new Promise((resolve, reject) => {
            ToggleModel.findOneAndDelete({_id})
                .then( () => resolve())
                .catch(err => reject(err));
        });
    }
}