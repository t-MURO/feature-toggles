import Role from "../enum/Role";
import UserPreferences from "../domain/UserPreferences";
import Mongoose from "mongoose";


export default class UserPublic {
    constructor(
        public _id: Mongoose.Types.ObjectId,
        public email: string,
        public role: Role,
        public preferences: UserPreferences
    ){}
}