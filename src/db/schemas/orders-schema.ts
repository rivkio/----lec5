import { Schema } from "mongoose";

const ordersSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [{
            productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true },
            age: { type: Number, required: true },
            productName: { type: String, required: true },
            price: { type: Number, required: true },
            barcode: { type: Number, required: true },
        }],
    totalAmount: { type: Number, required: false },
    status: {
        type: String, enum: ["pending", "approved", "processing", "shipped", "delivered", "cancelled", "returned", "completed"],
        default: "pending"
    },
    createdAt: { type: Date, default: Date.now },
    orderNumber: { type: String, required: true },
});

export default ordersSchema;



