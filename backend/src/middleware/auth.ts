import jwt from "jsonwebtoken";
import {Request, Response} from "express";

export default function authorize(req:Request, res:Response, next:Function) {
    const token: string = req.cookies['access_token'];
    if(token && token.length > 0){
        console.log('token: ', token);
        try{
            console.log(jwt.verify(token, "asdasdassd"));
            next();
        } catch (e) {
            console.log(e);
            return res.status(401).end();
        }
        // jwt.verify(token, "asdasdassd", (payload) => {
        //     console.log('payload', payload)
        //     next();
        // });
    }
}
