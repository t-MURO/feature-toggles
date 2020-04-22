import UserPublic from "../transfer/UserPublic";

export type LoginResponse = {
    user: UserPublic;
    token: string;
}