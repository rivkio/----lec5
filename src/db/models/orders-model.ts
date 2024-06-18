import mongoose from "mongoose";
import ordersSchema from "../schemas/orders-schema";

const Orders = mongoose.model("Orders", ordersSchema);

export default Orders;