import {Typegoose, prop, pre,} from "typegoose";
import Mongoose from "mongoose";

@pre<Workspace>('save', function(next){
    this.updatedAt = new Date();
    next();
})
export default class Workspace extends Typegoose {
    _id?: Mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;

    @prop({required: true, trim: true, minlength: 1, maxlength: 40})
    name!: string;

    @prop()
    description?: string;

    @prop({required: true, default: []})
    environments!: Mongoose.Types.ObjectId[];

    @prop({required: true})
    owner!: Mongoose.Types.ObjectId;

    @prop({required: true, default: []})
    members!: Mongoose.Types.ObjectId[];

    @prop({required: true, trim: true, lowercase: true, validate: {
        validator: validateRoute,
        message: `{VALUE} is not a valid route name. Only a-z, 0-9 and '-' are allowed characters `
    }})
    route!: string;

}

function validateRoute(route: string): boolean{
    return route.toLowerCase().match(/^[a-z0-9-]+$/) != null;
}
