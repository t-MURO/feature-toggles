import { getModelForClass } from "@typegoose/typegoose";
import User from "../domain/User";

const UserModel = getModelForClass(User);

export default UserModel;