import {Typegoose, prop, pre} from "typegoose";
import Mongoose from "mongoose";

@pre<Feature>('save', function(next){
    this.updatedAt = new Date();
    next();
})
export default class Feature extends Typegoose{

    _id?: Mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;

    @prop({required: true, unique: true})
    name!: string;

    @prop({default: false})
    isEnabled!: boolean;

    @prop()
    description?: string;
    
}