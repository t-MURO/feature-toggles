import { Typegoose, prop } from "typegoose";
import { Schema } from "mongoose";

export default class Feature extends Typegoose{

    _id?: Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;

    @prop({required: true, unique: true})
    name!: string;

    @prop({default: false})
    isEnabled!: boolean;

    @prop()
    description?: string;
    
}