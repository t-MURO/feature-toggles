import { Router } from 'express';
import User from '../models/domain/User';
import UserService from '../services/UserService';

const userController = Router();
const userService = new UserService();

userController

    .get('/:id', (req, res, next) => {
        userService.findOneById(req.params.id)
            .then(user => res.json(user))
            .catch(err => res.json(err));
    })

    .get('/', (req, res, next) => {
        userService.findAll()
            .then(user => res.json(user))
            .catch(err => res.json(err));
    })

    .post('/', (req, res, next) => {
        userService.create(req.body)
            .then((user:User) => res.json(user))
            .catch((err:Error) => res.status(400).send(err))
    })

    .put('/:id', (req, res, next) => {
        userService.update(req.params.id, req.body)
            .then(user => res.status(200).json(user))
            .catch(err => res.status(400).json(err));
    })

    .delete('/all', ((req, res) => {
        userService.deleteAll().then(msg => res.status(200).send(msg));
    }))

    .delete('/:id', (req, res, next) => {
        userService.delete(req.params.id)
            .then(() => res.sendStatus(204))
            .catch((err:Error) => res.status(400).json(err))
    });

export default userController;