import { Router } from "express";
import { validateProduct } from "../middleware/joi";
import { productService } from "../services/product-service";
import { isBusiness } from "../middleware/is-business";
import { validateToken } from "../middleware/validate-token";
import { isProductOwner } from "../middleware/is-product-owner";
import { isProductOwnerOrAdmin } from "../middleware/is-product-owner-or-admin";
import isProductId from "../middleware/is-product-id";


const router = Router();


router.delete("/:id", ...isProductOwnerOrAdmin, validateToken, async (req, res, next) => {
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



//update product
router.put("/:id", ...isProductOwner, validateProduct, async (req, res, next) => {
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


router.post("/", ...isBusiness, validateProduct, async (req, res, next) => {
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


export { router as productRouter };