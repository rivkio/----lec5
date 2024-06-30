import { RequestHandler } from "express";
import { validateToken } from "./validate-token";
import BizProductsError from "../errors/BizProductsError";
import { productService } from "../services/product-service";
import isProductId from "./is-product-id";


const _isProductOwner: RequestHandler = async (req, res, next) => {
    const product = await productService.getProductById(req.params.id);
    const userId = req.payload._id;

    if (product.userId === userId) {
        // console.log(product.userId, userId);
        return next();

    }

    else next(new BizProductsError(403, "Only the product owner is allowed"))
    // console.log(product.userId, userId);
};

export const isProductOwner = [isProductId, validateToken, _isProductOwner];




