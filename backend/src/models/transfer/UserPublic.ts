import Roles from "../enum/Roles";
import UserPreferences from "../domain/UserPreferences";
import Mongoose from "mongoose";


export default class UserPublic {
    constructor(
        public _id: Mongoose.Types.ObjectId,
        public email: string,
        public role: Roles,
        public preferences: UserPreferences
    ){}
}