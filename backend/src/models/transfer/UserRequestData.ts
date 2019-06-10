import Roles from "../enum/Roles";

export default class UserRequestData {
    constructor(
        public _id: string,
        public email: string,
        public role: Roles,
    ){}
}