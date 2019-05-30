import mongoose, { Schema } from 'mongoose';

const ToggleSchema = new Schema({
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
}, { collection: 'toggles' });

export default mongoose.model('Toggle', ToggleSchema);