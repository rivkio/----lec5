import { Schema } from "mongoose";
import { IOrder } from "../../@types/@types";

const ordersSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [{
            productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true },
            age: { type: Number, required: true },
        }],
    totalAmount: { type: Number, required: false },
    status: { type: String, default: "Pending" },
    createdAt: { type: Date, default: Date.now },
    orderNumber: { type: String, required: true },
});

export default ordersSchema;



