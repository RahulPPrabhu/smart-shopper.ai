import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    productName: {
        type: String,
    },
    productDescription: {
        type: String,
    },
    productPrice: {
        type: Number,
    },
    ratings: {
        type: Number,
    }
}, {timestamps: true});

export default mongoose.models.Cart || mongoose.model('Cart', cartSchema)