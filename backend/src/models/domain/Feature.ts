import {Typegoose, prop, pre} from "typegoose";
import Mongoose from "mongoose";

@pre<Feature>('findOneAndUpdate', function(this: any, next){
    this._update.updatedAt = new Date();
    next();
})
export default class Feature extends Typegoose{

    _id?: Mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;

    @prop({required: true, unique: true, maxlength: 30, validate: validateName})
    name!: string;

    @prop({default: false})
    isEnabled!: boolean;

    @prop()
    description?: string;
    
}

function validateName(value: string):boolean {
    return /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(value);
}