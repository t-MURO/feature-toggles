import mongoose, { Schema } from 'mongoose';

const EnvironmentSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    identifier: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    features: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, { collection: 'environments' });

export default mongoose.model('Environment', EnvironmentSchema);