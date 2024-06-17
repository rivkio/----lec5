import { RequestHandler } from "express";
import { validateToken } from "./validate-token";
import BizProductsError from "../errors/BizProductsError";
import { productService } from "../services/product-service";


const _isProductOwnerOrAdmin: RequestHandler = async (req, _, next) => {

    try {

        const product = await productService.getProductById(req.params.id);
        const userId = req.payload._id;

        if (!product) return next(new BizProductsError(404, "Card not found"));

        if (product.userId === userId || req.payload?.isAdmin) {
            // console.log(product.userId, userId, req.payload?.isAdmin);
            return next();

        }

        else next(new BizProductsError(403, "Only the product owner or admin is allowed"))
        // console.log(product.userId, userId);

    } catch (e) {
        next(e);
    }
};

export const isProductOwnerOrAdmin = [validateToken, _isProductOwnerOrAdmin];




