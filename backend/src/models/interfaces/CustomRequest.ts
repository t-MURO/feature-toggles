import { Request } from "express";
import UserTokenData from "../transfer/UserTokenData";

export default interface CustomRequest extends Request{
    user?: UserTokenData;
}