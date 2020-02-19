import { Rule } from "./Rule";
import crypto from "crypto";
import { Typegoose, prop, pre, arrayProp } from "typegoose";
import Mongoose from "mongoose";
import Feature from "./Feature";

const randomBytes = () => crypto.randomBytes(16).toString("hex");

@pre<Environment>("validate", function(this: any, next) {
  if (!this.identifier || this.identifier.length === 0) {
    this.identifier = randomBytes();
  }
  next();
})
@pre<Environment>("findOneAndUpdate", function(this: any, next) {
  this._update.updatedAt = new Date();
  next();
})
export default class Environment extends Typegoose {
  _id?: Mongoose.Types.ObjectId;

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
  features!: string[];

  @prop()
  serverAddress!: string;

  @prop()
  description?: string;

  @arrayProp({ required: true, default: [], items: Rule })
  rules!: Rule[];

  featuresComplete?: Feature[];
}
