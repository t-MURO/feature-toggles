import jwt from "jsonwebtoken";
import {Response} from "express";
import CustomRequest from "../models/interfaces/CustomRequest";
import {API_AUTH_SECRET, AUTH_COOKIE_NAME, TOKEN_EXPIRY_TIME} from "../config/config";
import {generateToken} from "../util/AuthUtilities";

export default async function authorize(req:CustomRequest, res:Response, next:Function) {

    const token: string = req.cookies[AUTH_COOKIE_NAME];
    console.log('auth.ts: reading token: ', token);

    if(token && token.length > 0){
        try{
            const tokenData:any = jwt.verify(token, API_AUTH_SECRET);
            const secondsBeforeExpiry = tokenData.exp - Date.now() / 1000;
            const userTokenData = tokenData.user;

            // sliding session
            if(secondsBeforeExpiry < TOKEN_EXPIRY_TIME * .5) {
                const token = await generateToken(userTokenData);
                res.cookie(AUTH_COOKIE_NAME, token, {maxAge: TOKEN_EXPIRY_TIME * 1000});
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
