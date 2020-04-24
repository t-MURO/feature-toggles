import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import path from 'path';
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { initSocket } from './services/WebSocketService';

import featureController from './controllers/FeatureController';
import environmentController from './controllers/EnvironmentController';
import userController from "./controllers/UserController";
import loginController from './controllers/LoginController';
import toggleController from "./controllers/ToggleController";
import { authorize } from "./services/AuthService";


const PORT = process.env.PORT || 3333;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/feature-toggles";

const whitelist = ['http://localhost:8080', 'http://localhost:8080'];

const init = async (application: express.Application) => {
    console.log("Initializing App...");
    try {
        const db = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log(`MongoDB: Connected to ${db.connection.host}:${db.connection.port}`);
        
        const server = await application.listen(PORT);
        console.log(`Feature Toggle Service listening at port ${PORT}`);
        
        initSocket(server);
        console.log("WebSocket ready");
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

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
app.use('/api/*', authorize);
app.use('/api/feature-toggles', featureController);
app.use('/api/environments', environmentController);
app.use('/api/users', userController);

app.use('/api/*', (req, res) => {
    res.status(404).end();
});


app.post(['/login', '/register', '/logout'], loginController);

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

init(app);