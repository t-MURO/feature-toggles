import { Router } from 'express';
import Workspace from '../models/domain/Workspace';
import WorkspaceService from '../services/WorkspaceService';

const workspaceController = Router();
const workspaceService = new WorkspaceService();

workspaceController

    .get('/:id', (req, res, next) => {
        workspaceService.findOneById(req.params.id)
            .then(workspace => res.json(workspace))
            .catch(err => res.json(err));
    })

    .get('/', (req, res, next) => {
        workspaceService.findAll()
            .then(workspace => res.json(workspace))
            .catch(err => res.json(err));
    })

    .post('/', (req, res, next) => {
        workspaceService.create(req.body)
            .then((workspace:Workspace) => res.json(workspace))
            .catch((err:Error) => res.status(400).send(err))
    })

    .put('/:id', (req, res, next) => {
        workspaceService.update(req.params.id, req.body)
            .then(workspace => res.status(200).json(workspace))
            .catch(err => res.status(400).json(err));
    })

    .delete('/:id', (req, res, next) => {
        workspaceService.delete(req.params.id)
            .then(() => res.sendStatus(204))
            .catch((err:Error) => res.status(400).json(err))
    })

export default workspaceController;