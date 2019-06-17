import {Router} from "express";
import User from '../models/domain/User';
import UserService from '../services/UserService';
import { AUTH_COOKIE_NAME, TOKEN_EXPIRY_TIME} from "../config/config";
import { toUserSimple } from '../util/UserUtilities';
import { generateToken } from "../util/AuthUtilities";

const loginController = Router();
const userService = new UserService();

loginController

    .post("/login", (async (req, res, next) => {
        const loginData = req.body;
        try {
            const user:User = await userService.findOneByEmail(loginData.email);
            if(user.password === loginData.password){
                const token = await generateToken(user);
                const userSimple = toUserSimple(user);
                res.cookie(AUTH_COOKIE_NAME, token, {maxAge: TOKEN_EXPIRY_TIME * 1000});
                return res.json(userSimple);
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

export default loginController;
