import jwt from "jsonwebtoken";
import {Response} from "express";
import CustomRequest from "../models/interfaces/CustomRequest";
import {API_AUTH_SECRET, AUTH_COOKIE_NAME} from "../config/config";

export default function authorize(req:CustomRequest, res:Response, next:Function) {
    console.log("auth");

    const token: string = req.cookies[AUTH_COOKIE_NAME];
    console.log('token: ', token);

    if(token && token.length > 0){
        try{
            const tokenData:any = jwt.verify(token, API_AUTH_SECRET);
            req.user = tokenData.user;
            next();
        } catch (e) {
            return res.status(401).send("Auth failed.");
        }
    } else {
        return res.status(401).send("Auth failed.");
    }
}
