import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import toggleController from './controllers/toggles';
import environmentController from './controllers/environment';

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/feature-toggles', { useNewUrlParser: true }).then(db => {
    console.log('db up and running')
})
.catch(err => console.log(err));

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('hi')
    res.send('hi')
});

app.use('/toggles', toggleController);
app.use('/environments', environmentController);

app.listen(3333, () => console.log('running'));