import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import path from 'path';
import cookieParser from "cookie-parser";
import morgan from "morgan";

import auth from './middleware/auth';
import { init } from './socket';

import featureController from './controllers/FeatureController';
import environmentController from './controllers/EnvironmentController';
import userController from "./controllers/UserController";
import workspaceController from "./controllers/WorkspaceController";
import loginController from './controllers/LoginController';
import toggleController from "./controllers/ToggleController";
import FeaturesRequest from "./models/transfer/FeaturesRequest";
import { getToggles } from "./services/ToggleService";


const PORT = process.env.PORT || 3333;

const whitelist = ['http://localhost:8080', 'http://localhost:8080'];

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

app.use(morgan('dev'));

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(cors({
    origin: whitelist,
    credentials: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/toggles', toggleController);
app.use('/api/*', auth);
app.use('/api/features', featureController);
app.use('/api/environments', environmentController);
app.use('/api/users', userController);
app.use('/api/workspaces', workspaceController);

app.use('/api/*', (req, res) => {
    res.status(404).end();
});


app.post(['/login', '/register', '/logout'], loginController);

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = app.listen(PORT, () => console.log('running'));
init(server);