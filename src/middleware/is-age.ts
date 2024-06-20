import { RequestHandler } from "express";
import BizProductsError from "../errors/BizProductsError";
import Product from "../db/models/product-model";
import { validateToken } from "./validate-token";


const _isAgeValid: RequestHandler  = async (req, _, next) => {
    const { productId, quantity, age } = req.body.products[0];

    try{
    const productDetails = await Product.findById(productId);

        if (!productDetails) {
            throw new BizProductsError(404, "Product not found");
        }

        // Check if productDetails.ages is an array before accessing it
        if (Array.isArray(productDetails.ages) && productDetails.ages.includes(age)) {
            return next();
        }

        throw new BizProductsError(403, `Selected age ${age} is not valid for product ${productDetails.productName}`);
    } catch (error) {
        next(error);
    }
};

export const isAgeValid = [validateToken, _isAgeValid];
