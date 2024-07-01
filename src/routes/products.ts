import { Router } from "express";
import { validateProduct } from "../middleware/joi";
import { productService } from "../services/product-service";
import { validateToken } from "../middleware/validate-token";
import { isProductOwnerOrAdmin } from "../middleware/is-product-owner-or-admin";
import isProductId from "../middleware/is-product-id";
import { isAdmin } from "../middleware/is-admin";


const router = Router();


router.delete("/:id", ...isAdmin, async (req, res, next) => {
    try {
        const product = await productService.deleteProduct(req.body, req.params.id);
        res.json(product);
    } catch (e) {
        next(e);
    }
});


router.patch("/:id/shopping-cart", validateToken, async (req, res, next) => {
    try {
        const userId = req.payload._id;
        const productId = req.params.id;
        const product = await productService.toggleShoppingCart(userId, productId);
        res.json(product);
    } catch (e) {
        next(e);
    }
});


router.get("/shopping-cart", validateToken, async (req, res, next) => {
    try {
        const userId = req.payload._id;
        const products = await productService.getShoppingCart(userId);
        res.json(products);
    } catch (e) {
        next(e);
    }
});


//update product
router.put("/:id", ...isAdmin, validateProduct, async (req, res, next) => {
    try {
        const product = await productService.updateProduct(req.body, req.payload._id);
        res.json(product);
    } catch (e) {
        next(e);
    }
});


//get all my products
router.get("/my-products", validateToken, async (req, res, next) => {
    try {
        const products = await productService.getProductByUserId(req.payload._id);
        res.json(products);
    } catch (e) {
        next(e);
    }
});


router.post("/", ...isAdmin, validateProduct, async (req, res, next) => {
    try {
        const result = await productService.createProduct(req.body, req.payload._id);
        res.status(201).json(result);
    } catch (e) {
        next(e);
    }
});


router.get("/", async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (e) {
        next(e);
    }
});


router.get("/:id", isProductId, async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.json(product);
    } catch (e) {
        next(e);
    }
});


router.patch("/replenish", ...isAdmin, async (req, res, next) => {
    try {
        const updates = req.body;
        const products = await productService.bulkReplenishStock(updates);
        res.json(products);
    } catch (e) {
        next(e);
    }
});

export { router as productRouter };