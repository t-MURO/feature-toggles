import {Router} from "express";
import User from '../models/domain/User';
import UserService from '../services/UserService';
import { toUserSimple } from '../util/UserUtilities';

const loginController = Router();
const userService = new UserService();

loginController

    .post("/login", (async (req, res, next) => {
        console.log('da')
        const loginData = req.body;
        try {
            const user:User = await userService.findOneByEmail(loginData.email);
            if(user.password === loginData.password){
                const userSimple = toUserSimple(user);
                if(userSimple) return res.json(userSimple);
                else return res.status(400).json("Auth failed.")
            }
        } catch (e) {
            console.log(e);
            return res.status(400).json("Auth failed.")
        }
    }));

export default loginController;
