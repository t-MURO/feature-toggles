import {Typegoose, prop, pre} from "typegoose";
import Mongoose from "mongoose";

@pre<Environment>('save', function(next){
    this.updatedAt = new Date();
    next();
})
export default class Environment extends Typegoose{

    _id?: Mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;

    @prop({required: true, trim: true, unique: true})
    name!: string;

    @prop({required: true, unique: true})
    identifier!: string;

    @prop({required: true, default: []})
    features!: string[];

    @prop()
    description?: string;
}