import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import path from 'path';

import featureController from './controllers/FeatureController';
import environmentController from './controllers/EnvironmentController';

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

app.use('/api/features', featureController);
app.use('/api/environments', environmentController);

app.use('/api/*', (req, res) => {
    res.sendStatus(404);
});

app.use('*', (req, res) => {
    res.sendfile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3333, () => console.log('running'));