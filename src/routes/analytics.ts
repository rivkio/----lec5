import { Router } from "express";
import { analyticsService } from "../services/analytics-service";
import { isAdmin } from "../middleware/is-admin";
import BizProductsError from "../errors/BizProductsError";
// import { isCategory } from "../middleware/is-category";
import _ from "underscore";


const router = Router();

// router.get("/inventory", ...isAdmin, async (_, res, next) => {
//     try {
//         const inventory = await analyticsService.getInventory();
//         res.json(inventory);
//     } catch (e) {
//         next(e);
//     }
// });



// router.get("/product-sales/:id", ...isAdmin, async (req, res, next) => {
//     try {
//         const productId = req.params.id;
//         const productSales = await analyticsService.getProductSales(productId);
//         res.json(productSales);
//     } catch (e) {
//         next(e);
//     }
// });



// router.get("/products/top-selling", ...isAdmin, async (_, res, next) => {
//     try {
//         const topSellingProducts = await analyticsService.getTopSellingProducts();
//         res.json(topSellingProducts);
//     } catch (e) {
//         next(e);
//     }
// });



router.get("/sales-by-date", ...isAdmin, async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;

        // המרת תאריכים למבנה תאריך
        const start = new Date(startDate as string);
        const end = new Date(endDate as string);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new BizProductsError(400, "Invalid date format");
        }

        if (end < start) {
            throw new BizProductsError(400, "End date cannot be earlier than start date");
        }

        const sales = await analyticsService.getSalesByDate(start, end);
        res.json(sales);
    } catch (e) {
        next(e);
    }
});



router.get("/order-status", ...isAdmin, async (_, res, next) => {
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



//get all orders
router.get("/all-orders", ...isAdmin, async (req, res, next) => {
    try {
        const orders = await analyticsService.getAllOrders();
        res.json(orders);
    } catch (e) {
        next(e);
    }
});



// router.get("/sales-by-category/:category", ...isCategory, async (req, res, next) => {
//     try {
//         const category = req.params.category;
//         const salesByCategory = await analyticsService.getProductsByCategory(category);
//         res.json(salesByCategory);
//     } catch (e) {
//         next(e);
//     }
// });



// router.get("/products-above-price/:price", ...isAdmin, async (req, res, next) => {
//     try {
//         const price = parseInt(req.params.price);
//         const productsByPrice = await analyticsService.getProductsInventoryAbovePrice(price);
//         res.json(productsByPrice);
//     } catch (e) {
//         next(e);
//     }
// });



// router.get("/products-below-price/:price", ...isAdmin, async (req, res, next) => {
//     try {
//         const price = parseInt(req.params.price);
//         const productsByPrice = await analyticsService.getProductsInventoryBelowPrice(price);
//         res.json(productsByPrice);
//     } catch (e) {
//         next(e);
//     }
// });



// router.get("/active-users", ...isAdmin, async (_, res, next) => {
//     try {
//         const usersByOrdersCount = await analyticsService.getUsersWithMostOrders();
//         res.json(usersByOrdersCount);
//     } catch (e) {
//         next(e);
//     }
// });



export { router as analyticsRouter };


