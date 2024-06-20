import { Router } from "express";
import { orderService } from "../services/order-service";
import { validateToken } from "../middleware/validate-token";
import { isAgeValid } from "../middleware/is-age";
import { isAdmin } from "../middleware/is-admin";

const router = Router();


router.post("/", ...isAgeValid, async (req, res, next) => {
    try {
        const userId = req.payload._id;
        const products = req.body.products;

        const order = await orderService.createOrder(userId, products);
        res.status(201).json(order);
    } catch (e) {
        next(e);
    }
});


router.get("/:id", validateToken, async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const order = await orderService.getOrder(orderId);
        res.json(order);
    } catch (e) {
        next(e);
    }
});


router.get("/user/:userId", validateToken, async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const orders = await orderService.getOrdersByUser(userId);
        res.json(orders);
    } catch (e) {
        next(e);
    }
});


router.get("/", ...isAdmin, async (_, res, next) => {
    try {
        const { orders, count } = await orderService.getAllOrders();
        const response = { AmountsOrders: count, orders }
        res.json(response);
    } catch (e) {
        next(e);
    }
});


export { router as ordersRouter}