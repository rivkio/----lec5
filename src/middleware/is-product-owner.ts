import { RequestHandler } from "express";
import { validateToken } from "./validate-token";
import BizProductsError from "../errors/BizProductsError";
import { productService } from "../services/product-service";


const _isProductOwner: RequestHandler = async (req, _, next) => {
    const product = await productService.getProductById(req.params.id);
    const userId = req.payload._id;

    if (product.userId === userId) {
        // console.log(product.userId, userId);
        return next();

    }

    else next(new BizProductsError(403, "Only the product owner is allowed"))
    // console.log(product.userId, userId);
};

export const isProductOwner = [validateToken, _isProductOwner];




