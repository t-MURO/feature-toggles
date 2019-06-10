import User from "../models/domain/User";
import UserPublic from "../models/transfer/UserPublic";
import UserTokenData from "../models/transfer/UserTokenData";

export function toUserSimple(user: User): UserPublic|null {
    const {_id, email, role, preferences} = user;
    if(_id && email && role) return new UserPublic(_id, email, role, preferences);
    else return null;
}

export function toUserTokenData(user: User): UserTokenData|null {
    const {_id, email, role} = user;
    if(_id && email && role) return new UserTokenData(_id.toHexString(), email, role);
    else return null;
}