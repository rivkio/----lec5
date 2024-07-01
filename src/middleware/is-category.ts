import { RequestHandler } from "express";
import _ from "underscore";
import BizProductsError from "../errors/BizProductsError";
import Product from "../db/models/product-model";
import { isAdmin } from "./is-admin";


const _isCategory: RequestHandler = async (req, _, next) => {
    const { category } = req.params;
    const productDetails = await Product.find({ category });

    if (productDetails.length > 0) {
        return next();
    }

    next(new BizProductsError(404, `Category is not found`));

};

export const isCategory = [isAdmin, _isCategory];