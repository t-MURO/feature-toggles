import mongoose from 'mongoose';
import { ModelType } from 'typegoose';
import User from "../domain/User";

const UserModel: ModelType<User> = new User().setModelForClass(User, {
    existingMongoose: mongoose,
    schemaOptions: {
        collection: 'users',
        timestamps: true,
    }
});

export default UserModel;