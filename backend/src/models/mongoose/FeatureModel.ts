import mongoose from 'mongoose';
import Feature from '../domain/Feature';
import { ModelType } from 'typegoose';

const FeatureModel:ModelType<Feature> = new Feature().setModelForClass(Feature, {
    existingMongoose: mongoose,
    schemaOptions: {
        collection: 'features',
        timestamps: true,
    }
});
export default FeatureModel