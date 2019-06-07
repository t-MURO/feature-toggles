import jwt, {TokenExpiredError} from "jsonwebtoken";
import {Request, Response} from "express";

export default function authorize(req:Request, res:Response, next:Function) {
    const token: string = req.cookies['access_token'];
    if(token && token.length > 0){
        console.log('token: ', token);
        try{
            console.log(jwt.verify(token, "asdasdassd"));
        } catch (e) {
            console.log(e)
            next()
        }
        // jwt.verify(token, "asdasdassd", (payload) => {
        //     console.log('payload', payload)
        //     next();
        // });
    }
    next();
}
