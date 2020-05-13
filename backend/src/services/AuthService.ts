import { Response } from "express";
import { LoginResponse } from "../models/types/LoginResponse";
import UserService from "./UserService";
import { toUserTokenData, toUserSimple } from "../util/UserUtilities";
import jwt from "jsonwebtoken";
import { API_AUTH_SECRET, TOKEN_EXPIRY_TIME, AUTH_COOKIE_NAME } from "../config/config";
import User from "../models/domain/User";
import CustomRequest from "../models/interfaces/CustomRequest";

const userService = new UserService();

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

export default class AuthService {
    public authenticate = async (email: string, password: string): Promise<LoginResponse> => {
        
        const user: User = await userService.findOneByEmail(email);
        if (!user || user.password !== password) {
            throw new Error("Authentication failed.");
        }
        const token = await generateToken(user);

        return { user: toUserSimple(user), token }
    }
}

export const authorize = async (req:CustomRequest, res:Response, next:Function) => {

    const token: string = req.cookies[AUTH_COOKIE_NAME];
    if(token && token.length > 0){
        try{
            const tokenData:any = jwt.verify(token, API_AUTH_SECRET);
            const secondsBeforeExpiry = tokenData.exp - Date.now() / 1000;
            const userTokenData = tokenData.user;

            // sliding session
            if(secondsBeforeExpiry < TOKEN_EXPIRY_TIME * .5) {
                const token = await generateToken(userTokenData);
                res.cookie(
                    AUTH_COOKIE_NAME,
                    token,
                    {
                        maxAge: TOKEN_EXPIRY_TIME * 1000,
                        // httpOnly: true
                    }
                );
            }

            req.user = tokenData.user;

            next();
        } catch (e) {
            return res.status(401).send(e.message);
        }
    } else {
        return res.status(401).send("Auth failed.");
    }
}