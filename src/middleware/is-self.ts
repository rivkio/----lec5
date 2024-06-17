import { RequestHandler } from "express";
import BizProductsError from "../errors/BizProductsError";
import { validateToken } from "./validate-token";


const _isSelf: RequestHandler = (req, _, next) => {
    if (req.params.id === req.payload?._id) {
        return next();
    }

    next(new BizProductsError(403, "Only the product owner is allowed"));
};

export const isSelf = [validateToken, _isSelf];

