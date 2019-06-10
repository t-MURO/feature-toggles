import UserTokenData from "./transfer/UserTokenData";

declare global {
    namespace Express {
        interface Request {
            user?: UserTokenData;
        }
    }
}