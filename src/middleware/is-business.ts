import { RequestHandler } from "express";
import BizProductsError from "../errors/BizProductsError";
import { validateToken } from "./validate-token";


const _isBusiness: RequestHandler = (req, _, next) => {
    const { isBusiness } = req.payload;

    if (isBusiness) {
        return next();
    }

    next(new BizProductsError(403, "Must be a business"));
};

//export an array of middleware
export const isBusiness = [validateToken, _isBusiness];