import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import path from 'path';

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

app.use('/api/toggles', toggleController);
app.use('/api/environments', environmentController);

app.use('/api/*', (req, res) => {
    res.send(404);
});

app.use('*', (req, res) => {
    res.sendfile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3333, () => console.log('running'));