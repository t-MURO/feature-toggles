import { toUserTokenData } from "./UserUtilities";
import jwt from "jsonwebtoken";
import { API_AUTH_SECRET, TOKEN_EXPIRY_TIME } from "../config/config";
import User from "../models/domain/User";

export const generateToken = (user:User): Promise<string> => {
    return new Promise((resolve, reject) => {
        const userTokenData = toUserTokenData(user);
        jwt.sign(
            { user: userTokenData },
            API_AUTH_SECRET,
            { expiresIn: TOKEN_EXPIRY_TIME },
            (err: Error, token: string) => err ? reject(err) : resolve(token)
        )});
};
