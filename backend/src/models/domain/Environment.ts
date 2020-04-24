import { Rule } from "./Rule";
import crypto from "crypto";
import { prop, pre, arrayProp, modelOptions, mongoose } from "@typegoose/typegoose";
import Mongoose from "mongoose";

const randomBytes = () => crypto.randomBytes(16).toString("hex");

@pre<Environment>("validate", function (this: any, next) {
  if (!this.identifier || this.identifier.length === 0) {
    this.identifier = randomBytes();
  }
  next();
})
@pre<Environment>("findOneAndUpdate", function (this: any, next) {
  this._update.updatedAt = new Date();
  if (next) {
    next();
  }
})

@modelOptions({
  existingMongoose: mongoose,
  schemaOptions: {
    collection: 'environments',
    timestamps: true,
  }
})
export default class Environment {
  _id?: Mongoose.Types.ObjectId | string;

  @prop({ required: true })
  createdBy!: string;

  createdAt?: Date;

  @prop({ required: true })
  updatedBy!: string;

  updatedAt?: Date;

  @prop({ required: true, trim: true, unique: true })
  name!: string;

  @prop({ required: true, unique: true, default: randomBytes })
  identifier!: string;

  @arrayProp({ required: true, default: [], items: String })
  featureToggles!: string[];

  @prop()
  serverAddress!: string;

  @prop()
  description?: string;

  @arrayProp({ default: [], items: Rule })
  rules!: Rule[];
}
