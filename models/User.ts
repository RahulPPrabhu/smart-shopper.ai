import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
    }
}, {timestamps: true});

export default mongoose.models.User || mongoose.model('User', UserSchema);