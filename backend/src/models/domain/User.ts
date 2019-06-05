import {Typegoose, prop, Ref, pre,} from "typegoose";
import Mongoose from "mongoose";
import Roles from "../enum/Roles";
import UserPreferences from "./UserPreferences";

@pre<User>('save', function(next){
    this.updatedAt = new Date();
    next();
})
export default class User extends Typegoose {
    _id?: Mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;

    @prop({required: true, unique: true, maxlength: 30, lowercase: true, validate: validateEmail })
    email!: string;

    @prop({required: true})
    password!: string;

    @prop()
    lastLogin?: Date;

    @prop({default: Roles.USER})
    role!: string;

    @prop({default: new UserPreferences})
    preferences?: UserPreferences;
}

function validateEmail(value: string):boolean {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(value);
}