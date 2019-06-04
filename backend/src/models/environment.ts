import { Typegoose, prop } from "typegoose";
import { Schema } from "mongoose";

export default class Environment extends Typegoose{

    _id?: Schema.Types.ObjectId;
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