import crypto from "crypto";
import RequestOptions from "../transfer/RequestOptions";
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


export const evaluate = (
  rule: Rule,
  requestOptions?: RequestOptions
): boolean => {
  if (!requestOptions || !requestOptions.userGroup || !requestOptions.userId) {
    return false;
  }

  if (rule.roles.length > 0 && !rule.roles.includes(requestOptions.userGroup)) {
    console.log(
      `declining toggle - allowed roles: ${rule.roles}, given role: ${requestOptions.userGroup}`
    );
    return false;
  }

  if (rule.displayToPercentage) {
    const hash = crypto.createHash("sha256");
    const hexValue: string = hash.update(requestOptions.userId).digest("hex");
    const shortenedHexValue = hexValue.substring(0, 2);
    const decimalValue = parseInt(shortenedHexValue, 16);
    console.log(
      `displayPercentage calculation: value from id = ${decimalValue /
      2.55} | percentage: ${rule.displayToPercentage}`
    );
    if (decimalValue > rule.displayToPercentage * 2.55) {
      return false;
    }
  }

  return true;
};
