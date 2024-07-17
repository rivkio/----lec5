import { Router } from "express";
import { validateProduct } from "../middleware/joi";
import { productService } from "../services/product-service";
import { validateToken } from "../middleware/validate-token";
import isProductId from "../middleware/is-product-id";
import { isAdmin } from "../middleware/is-admin";
import _ from "underscore";
import upload from "../middleware/uploads";
import productSchema from "../db/schemas/product-schema";




const router = Router();


// router.post("/", ...isAdmin, validateProduct, async (req, res, next) => {
//     try {
//         const result = await productService.createProduct(req.body, req.payload._id);
//         res.status(201).json(result);
//     } catch (e) {
//         next(e);
//     }
// });


router.post("/", ...isAdmin, upload.single("image"), validateProduct, async (req, res, next) => {
    try {
        console.log("Payload:", req.payload); // הוספת דיבאג
        if (!req.payload) {
            throw new Error("Invalid token");
        }
        const imageUrl = `http://localhost:8080/uploads/${req.file.filename}`;
        res.json({ imageUrl })
        const productData = { ...req.body, image: { url: imageUrl, alt: req.body.alt } };
        const result = await productService.createProduct(productData, req.payload._id);
        res.status(201).json(result);
    } catch (e) {
        next(e);
    }
});




router.delete("/:id", ...isAdmin, async (req, res, next) => {
    try {
        const product = await productService.deleteProduct(req.body, req.params.id);
        res.json(product);
    } catch (e) {
        next(e);
    }
});


router.put("/:id", ...isAdmin, isProductId, async (req, res, next) => {
    try {
        //const userId = req.payload._id;
        const productId = req.params.id;
        const productData = req.body;

        const updatedProduct = await productService.updateProduct(productId, productData);
        res.json(updatedProduct);
    } catch (e) {
        next(e);
    }
});



//get all my products
// router.get("/my-products", validateToken, async (req, res, next) => {
//     try {
//         const products = await productService.getProductByUserId(req.payload._id);
//         res.json(products);
//     } catch (e) {
//         next(e);
//     }
// });


router.get("/", async (_, res, next) => {
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


router.patch("/:id/shopping-cart", validateToken, isProductId, async (req, res, next) => {
    try {
        const userId = req.payload._id;
        const productId = req.params.id;
        const cart = await productService.toggleShoppingCart(userId, productId);
        res.json(cart);
    } catch (e) {
        next(e);
    }
});


router.get("/shopping-cart/all", validateToken, async (req, res, next) => {
    try {
        const userId = req.payload._id;
        const products = await productService.getShoppingCart(userId);
        res.json(products);
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