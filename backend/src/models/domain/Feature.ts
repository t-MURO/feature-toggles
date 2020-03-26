import { prop, pre, modelOptions, mongoose } from "@typegoose/typegoose";
import Mongoose from "mongoose";

export enum FeatureStatus {
    REQUESTED = "REQUESTED",
    ACTIVE = "ACTIVE",
    DELETED = "DELETED"
}
@pre<Feature>('findOneAndUpdate', function (this: any, next) {
    this._update.updatedAt = new Date();
    if (next) {
        next();
    }
})

@modelOptions({
    existingMongoose: mongoose,
    schemaOptions: {
        collection: 'features',
        timestamps: true,
    }
})
export default class Feature {

    _id?: Mongoose.Types.ObjectId;

    @prop({ required: true })
    createdBy!: string;

    createdAt?: Date;

    @prop({ required: true })
    updatedBy!: string;

    updatedAt?: Date;

    @prop({ required: true, unique: true, maxlength: 30, validate: validateName })
    name!: string;

    @prop({ default: false })
    isEnabled!: boolean;

    @prop()
    description?: string;

    @prop({ required: true, default: FeatureStatus.ACTIVE, enum: FeatureStatus })
    status?: FeatureStatus;
}

function validateName(value: string): boolean {
    return /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(value);
}