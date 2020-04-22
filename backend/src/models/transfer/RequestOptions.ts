import Role from "../enum/Role";

export default class RequestOptions {
    constructor(
        public userId: string,
        public userGroup: Role
    ){}
}