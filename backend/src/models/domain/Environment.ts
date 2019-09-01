import crypto from "crypto";
import {Typegoose, prop, pre} from "typegoose";
import Mongoose from "mongoose";
import Feature from "./Feature";

@pre<Environment>('findOneAndUpdate', function(this: any, next){
    this._update.updatedAt = new Date();
    next();
})
export default class Environment extends Typegoose{

    _id?: Mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;

    @prop({required: true, trim: true, unique: true})
    name!: string;

    @prop({required: true, unique: true, default: crypto.randomBytes(4).toString("hex")})
    identifier!: string;

    @prop({required: true, default: []})
    features!: string[];

    @prop()
    description?: string;

    featuresComplete?: Feature[];
}