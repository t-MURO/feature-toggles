import UserService from './UserService';
import User from '../models/domain/User';
import { generateToken } from '../util/AuthUtilities';
import { toUserSimple } from '../util/UserUtilities';
import { LoginResponse } from '../models/types/LoginResponse';

const userService = new UserService();

export default class LoginService {
    public register = async (user : User) => {
       return await userService.create(user);
    }

    public login = async (email: string, password: string): Promise<LoginResponse> => {
        const user: User = await userService.findOneByEmail(email);
        if (!user || user.password !== password) {
           throw new Error("Authentication failed.");
        }
        const token = await generateToken(user);

        return { user: toUserSimple(user), token }
    }
}