import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import path from 'path';
import jwt from "jsonwebtoken";

const cookieParser  = require("cookie-parser");

import auth from './middleware/auth';

import featureController from './controllers/FeatureController';
import environmentController from './controllers/EnvironmentController';
import userController from "./controllers/UserController";
import workspaceController from "./controllers/WorkspaceController";
import Roles from "./models/enum/Roles";
import User from "./models/domain/User";
import {ObjectID} from "bson";

const PORT = process.env.PORT || 3333;

mongoose.connect('mongodb://localhost:27017/feature-toggles', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(db => {
        console.log('db up and running')
    })
    .catch(err => console.log(err));

const app = express();

app.use(express.static('public'));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// app.use('/api/*', auth);
app.use('/api/features', featureController);
app.use('/api/environments', environmentController);
app.use('/api/users', userController);
app.use('/api/workspaces', workspaceController);

app.use('/api/*', (req, res) => {
    res.sendStatus(404);
});

// app.use('/login', auth);

app.use('/login', (req:Request, res:Response) => {
    console.log(req.cookies);
    const user = new User();
    user._id = new ObjectID("5cf24bba6da2d83f48ccae3a");
    user.email = "test@g.com";
    user.role = Roles.ADMIN;
    jwt.sign({user: user}, "asdasdassd",{expiresIn: "30m"}, (err:any, token:string) => {
        res.setHeader('Set-Cookie', `access_token=${token}`);
        res.json(token);
    })

});

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log('running'));