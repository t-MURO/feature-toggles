import Roles from "../enum/Roles";

export default class RequestOptions {
    constructor(
        public userId: string,
        public userGroup: Roles
    ){}
}