import UserService from './UserService';
import User from '../models/domain/User';
import { LoginResponse } from '../models/types/LoginResponse';
import AuthService from './AuthService';

const userService = new UserService();
const authService = new AuthService();

export default class LoginService {
    public register = async (user : User) => {
       return await userService.create(user);
    }

    public login = async (email: string, password: string): Promise<LoginResponse> => {
        return authService.authenticate(email, password);
    }
}