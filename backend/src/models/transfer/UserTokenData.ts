import Roles from "../enum/Roles";

export default class UserTokenData {
    constructor(
        public _id: string,
        public email: string,
        public role: Roles,
    ){}
}