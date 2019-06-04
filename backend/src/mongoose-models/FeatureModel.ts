import mongoose, { Schema } from 'mongoose';

const FeatureSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    isEnabled: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: false
    }
}, { collection: 'features' });

export default mongoose.model('Feature', FeatureSchema);