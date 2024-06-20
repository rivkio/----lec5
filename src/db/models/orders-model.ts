import mongoose from "mongoose";
import ordersSchema from "../schemas/orders-schema";

const Order = mongoose.model("Order", ordersSchema);

export default Order;