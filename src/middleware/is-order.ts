// import { RequestHandler } from "express";
// import { validateToken } from "./validate-token";
// import Order from "../db/models/orders-model";
// import BizProductsError from "../errors/BizProductsError";
// import { isAdmin } from "./is-admin";


// const _isOrder: RequestHandler = async (req, res, next) => {

//     const order = await Order.findById(req.params.orderId);
//     if (order && order.status !== "cancelled") {
//         return next();
//     }
//     else if (order && order.status === "cancelled") {
//         return next(new BizProductsError(400, "Order is cancelled"));
//     }

//     return next(new BizProductsError(403, "Order not found"));
// };


// export const isOrder = [validateToken, isAdmin, _isOrder];
