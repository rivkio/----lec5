import { RequestHandler } from "express";
import _ from "underscore";
import BizProductsError from "../errors/BizProductsError";
import Product from "../db/models/product-model";
import { validateToken } from "./validate-token";


const _isSizeValid: RequestHandler  = async (req, _, next) => {
    const { productId, quantity, size } = req.body.products[0];

    try{
    const productDetails = await Product.findById(productId);

        if (!productDetails) {
            throw new BizProductsError(404, "Product not found");
        }

        // Check if productDetails.sizes is an array before accessing it
        if (Array.isArray(productDetails.size) && productDetails.size.includes(size)) {
            return next();
        }

        throw new BizProductsError(403, `Selected size ${size} is not valid for product ${productDetails.productName}`);
    } catch (error) {
        next(error);
    }
};

export const isSizeValid = [validateToken, _isSizeValid];
