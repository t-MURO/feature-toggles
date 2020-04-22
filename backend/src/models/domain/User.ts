import { prop, pre, modelOptions, mongoose, } from "@typegoose/typegoose";
import Mongoose from "mongoose";
import Role from "../enum/Role";
import UserPreferences from "./UserPreferences";

@pre<User>('findOneAndUpdate', function (this: any, next) {
    this._update.updatedAt = new Date();
    if (next) {
        next();
    }
})

@modelOptions({
    existingMongoose: mongoose,
    schemaOptions: {
        collection: 'users',
        timestamps: true,
    }
})
export default class User {
    _id!: Mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;

    @prop({ required: true, unique: true, maxlength: 30, lowercase: true, validate: validateEmail })
    email!: string;

    @prop({ required: true })
    password!: string;

    @prop()
    lastLogin?: Date;

    @prop({ default: Role.USER })
    role!: Role;

    @prop({ default: new UserPreferences })
    preferences!: UserPreferences;
}

function validateEmail(value: string): boolean {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(value);
}