import Role from "../enum/Role";

export default class UserTokenData {
    constructor(
        public _id: string,
        public email: string,
        public role: Role,
    ){}
}