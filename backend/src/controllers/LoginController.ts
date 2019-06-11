import {Router} from "express";
import jwt from "jsonwebtoken";
import User from '../models/domain/User';
import UserService from '../services/UserService';
import {API_AUTH_SECRET, AUTH_COOKIE_NAME} from "../config/config";
import {toUserSimple, toUserTokenData} from '../util/UserUtilities';

const loginController = Router();
const userService = new UserService();

loginController

    .post("/login", (async (req, res, next) => {
        const loginData = req.body;
        try {
            const user:User = await userService.findOneByEmail(loginData.email);
            if(user.password === loginData.password){
                const userTokenData = toUserTokenData(user);
                jwt.sign({user: userTokenData}, API_AUTH_SECRET, {expiresIn: "4h"}, (err: any, token: string) => {
                    if(err) {
                        console.log(err);
                        res.status(400).json('Auth failed.')
                    } else {
                        const userSimple = toUserSimple(user);
                        res.cookie(AUTH_COOKIE_NAME, token, {expires: new Date("2020-09-09")});
                        return res.json(userSimple);
                    }
                });
            }
            else return res.status(400).json("Auth failed.")
        } catch (e) {
            console.log(e);
            return res.status(400).json("Auth failed.")
        }
    }))

    .post('/register', (async (req, res, next) => {
        const user = req.body;
        userService.create(user).then(() => res.end()).catch(() => res.status(400).end());
    }))

    .post('/logout', (async (req, res, next) => {
        res.cookie(AUTH_COOKIE_NAME,null,{expires: new Date(0)});
        return res.status(200).end();
    }));

// app.use('/login', (req:Request, res:Response) => {
//     console.log(req.cookies);
//     const user = new User();
//     user._id = new ObjectID("5cf24bba6da2d83f48ccae3a");
//     user.email = "test@g.com";
//     user.role = Roles.ADMIN;
//     jwt.sign({user: user}, API_AUTH_SECRET,{expiresIn: "30m"}, (err:any, token:string) => {
//         res.setHeader('Set-Cookie', `access_token=${token}`);
//         res.json(token);
//     })
//
// });
export default loginController;
