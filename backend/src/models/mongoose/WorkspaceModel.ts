import mongoose from 'mongoose';
import Workspace from '../domain/Workspace';
import { ModelType } from 'typegoose';

const WorkspaceModel:ModelType<Workspace> = new Workspace().setModelForClass(Workspace, {
    existingMongoose: mongoose,
    schemaOptions: {
        collection: 'workspaces',
        timestamps: true,
    }
});
export default WorkspaceModel