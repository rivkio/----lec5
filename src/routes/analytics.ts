import { Router } from "express";
import { analyticsService } from "../services/analytics-service";
import { isAdmin } from "../middleware/is-admin";


const router = Router();

router.get("/inventory", ...isAdmin, async (req, res, next) => {
    try {
        const inventory = await analyticsService.getInventory();
        res.json(inventory);
    } catch (e) {
        next(e);
    }
});


router.get("/total-sold", ...isAdmin, async (req, res, next) => {
    try {
        const totalSold = await analyticsService.getTotalSold();
        res.json(totalSold);
    } catch (e) {
        next(e);
    }
});

router.get("/product-sales/:id", ...isAdmin, async (req, res, next) => {
    try {
        const productId = req.params.id;
        const productSales = await analyticsService.getProductSales(productId);
        res.json(productSales);
    } catch (e) {
        next(e);
    }
});


router.get("/sales-by-date", ...isAdmin, async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;

        // המרת תאריכים למבנה תאריך
        const start = new Date(startDate as string);
        const end = new Date(endDate as string);

        const sales = await analyticsService.getSalesByDate(start, end);
        res.json(sales);
    } catch (e) {
        next(e);
    }
});



router.get("/order-status", ...isAdmin, async (req, res, next) => {
    try {
        const orderStatus = await analyticsService.getOrderStatus();
        res.json(orderStatus);
    } catch (e) {
        next(e);
    }
});



router.patch("/status/:orderId", ...isAdmin, async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const { status } = req.body;

        const updatedOrder = await analyticsService.updateOrderStatus(orderId, status);
        res.json(updatedOrder);
    } catch (e) {
        next(e);
    }
});



router.get("/unsold-products", ...isAdmin, async (req, res, next) => {
    try {
        const unsoldProducts = await analyticsService.getUnsoldProducts();
        res.json(unsoldProducts);
    } catch (e) {
        next(e);
    }
});



router.get("/sales-by-category/:category", ...isAdmin, async (req, res, next) => {
    try {
        const category = req.params.category;
        const salesByCategory = await analyticsService.getProductsByCategory(category);
        res.json(salesByCategory);
    } catch (e) {
        next(e);
    }
});



router.get("/products-above-price/:price", ...isAdmin, async (req, res, next) => {
    try {
        const price = parseInt(req.params.price);
        const productsByPrice = await analyticsService.getProductsInventoryAbovePrice(price);
        res.json(productsByPrice);
    } catch (e) {
        next(e);
    }
});



router.get("/products-below-price/:price", ...isAdmin, async (req, res, next) => {
    try {
        const price = parseInt(req.params.price);
        const productsByPrice = await analyticsService.getProductsInventoryBelowPrice(price);
        res.json(productsByPrice);
    } catch (e) {
        next(e);
    }
});



router.get("/total-amount", ...isAdmin, async (req, res, next) => {
    try {
        const orders = await analyticsService.getOrdersByTotalAmount();
        res.json(orders);
    } catch (e) {
        next(e);
    }
});



router.get("/active-users", ...isAdmin, async (req, res, next) => {
    try {
        const usersByOrdersCount = await analyticsService.getUsersWithMostOrders();
        res.json(usersByOrdersCount);
    } catch (e) {
        next(e);
    }
});



export { router as analyticsRouter };


