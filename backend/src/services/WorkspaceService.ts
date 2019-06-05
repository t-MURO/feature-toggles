import WorkspaceModel from '../models/mongoose/WorkspaceModel';
import Workspace from '../models/domain/Workspace';
import { Error } from 'mongoose';

export default class WorkspaceService {

    public findOneById(_id: string):Promise<Workspace|Error>{
        return new Promise((resolve, reject) => WorkspaceModel.findById(_id, (err:Error, workspace:Workspace) => err ? reject(err) : resolve(workspace)));
    }

    public findAll():Promise<Workspace[]|Error>{
        return new Promise((resolve, reject) => WorkspaceModel.find({}, (err:Error, workspaces:Workspace[]) => err ? reject(err) : resolve(workspaces)));
    }

    public create(workspaces:Workspace|Workspace[]):Promise<any>{
        return new Promise((resolve, reject) => {
            WorkspaceModel.create(workspaces)
                .then((t:Workspace|Workspace[]) => resolve(t))
                .catch((err:Error) => reject(err));
        });
    }

    public update(_id: string, workspace: Workspace):Promise<any>{
        return new Promise((resolve, reject) => {
            WorkspaceModel.findOneAndUpdate({_id}, workspace)
                .then((t:any) => resolve(t))
                .catch((err:Error) => reject(err))
        });
    }

    public delete(_id:string):Promise<any>{
        return new Promise((resolve, reject) => {
            WorkspaceModel.findOneAndDelete({_id})
                .then( () => resolve())
                .catch((err: any) => reject(err));
        });
    }
}