import { Schema } from "mongoose";
import { IOrder } from "../../@types/@types";

const ordersSchema = new Schema<IOrder>({
    orderNumber: { type: String, required: true, unique: true },
    orderDate: { type: Date, required: true },
    orderItems: [
        {
            product: { type: Schema.Types.ObjectId, ref: "Product", required: true},
            quantity: { type: Number, required: true },
        },
    ],
    orderTotal: { type: Number, required: true },
});

export default ordersSchema;