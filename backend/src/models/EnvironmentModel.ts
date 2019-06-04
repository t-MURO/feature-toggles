import mongoose, { Schema } from 'mongoose';
import { ModelType } from 'typegoose';
import Environment from './Environment';

const EnvironmentModel:ModelType<Environment> = new Environment().setModelForClass(Environment, {
    existingMongoose: mongoose,
    schemaOptions: {
        collection: 'environments',
        timestamps: true,
    }
})

export default EnvironmentModel;