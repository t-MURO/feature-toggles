import Role from "../enum/Role";
import Mongoose from "mongoose";
import { prop, arrayProp } from "@typegoose/typegoose"

export class Rule {
  @prop()
  _id!: Mongoose.Types.ObjectId;

  @prop({ required: true })
  name!: string;

  @arrayProp({ default: [], items: String })
  featureIds!: string[];

  @arrayProp({ default: [], enum: Role, items: String })
  roles!: Role[];

  @prop({ required: true, default: null })
  displayToPercentage!: number | null;
}
