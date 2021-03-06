import { Router } from "express";
import User from "../models/domain/User";
import { AUTH_COOKIE_NAME, TOKEN_EXPIRY_TIME } from "../config/config";
import UserService from "../services/UserService";
import AuthService from "../services/AuthService";

const loginController = Router();
const authService = new AuthService();
const userService = new UserService();

loginController

  .post("/login", async (req, res, next) => {
    try {
      const { token, user } = await authService.authenticate(req.body.email, req.body.password);
      res.cookie(AUTH_COOKIE_NAME, token, {
        maxAge: TOKEN_EXPIRY_TIME * 1000,
        httpOnly: true,
        // secure: true
      });
      return res.json(user);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e.message });
    }
  })

  .post("/register", async (req, res, next) => {
    const user: User = req.body;
    try {
      await userService.create(user);
      res.status(201).end()
    } catch (e) {
      res.status(400)
      if (e.code === 11000) {
        return res.json({ message: "Email address already in use" });
      }
      return res.json({ message: "Error creating User" });
    }
  })

  .post("/logout", async (req, res, next) => {
    res.cookie(AUTH_COOKIE_NAME, null, { expires: new Date(0) });
    return res.status(200).end();
  });

export default loginController;
