import UserRequestData from "./transfer/UserRequestData";

declare namespace Express {
    export interface Request {
        user?: UserRequestData;
    }
}