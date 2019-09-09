import crypto from "crypto";
import {Typegoose, prop, pre, arrayProp} from "typegoose";
import Mongoose from "mongoose";
import Feature from "./Feature";

@pre<Environment>('findOneAndUpdate', function(this: any, next){
    this._update.updatedAt = new Date();
    next();
})
export default class Environment extends Typegoose{

    _id?: Mongoose.Types.ObjectId;

    @prop({required: true})
    createdBy!: string;

    createdAt?: Date;

    @prop({required: true})
    updatedBy!: string;

    updatedAt?: Date;

    @prop({required: true, trim: true, unique: true})
    name!: string;

    @prop({required: true, unique: true, default: crypto.randomBytes(4).toString("hex")})
    identifier!: string;

    @arrayProp({required: true, default: [], items: String})
    features!: string[];

    @prop()
    description?: string;

    featuresComplete?: Feature[];
}