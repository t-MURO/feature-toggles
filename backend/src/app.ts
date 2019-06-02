import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import toggleController from './controllers/ToggleController';
import environmentController from './controllers/EnvironmentController';

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/feature-toggles', { useNewUrlParser: true }).then(db => {
    console.log('db up and running')
})
.catch(err => console.log(err));

const app = express();

app.use(express.static('public'));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/toggles', toggleController);
app.use('/environments', environmentController);

app.listen(3333, () => console.log('running'));