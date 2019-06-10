import jwt from "jsonwebtoken";
import {Response} from "express";
import CustomRequest from "../models/interfaces/CustomRequest";

export default function authorize(req:CustomRequest, res:Response, next:Function) {

    const token: string = req.cookies['access_token'];
    if(token && token.length > 0){
        try{
        console.log('token: ', token);
            const tokenData:any = jwt.verify(token, "asdasdassd");
            req.user = tokenData.user;
            next();
        } catch (e) {
            next();
            return res.status(401).end();
        }
    }
    // next();
    return res.status(401).end();
}
