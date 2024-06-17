import { RequestHandler } from "express";
import BizProductsError from "../errors/BizProductsError";
import { validateToken } from "./validate-token";


const _isAdmin: RequestHandler = (req, _, next) => {
    if (req.payload?.isAdmin) {
        return next();
    }

    next(new BizProductsError(403, "Must be admin"));
};

export const isAdmin = [validateToken, _isAdmin];