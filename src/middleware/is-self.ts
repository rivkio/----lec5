import { RequestHandler } from "express";
import _ from "underscore";
import BizProductsError from "../errors/BizProductsError";
import { validateToken } from "./validate-token";


const _isSelf: RequestHandler = (req, _, next) => {
    if (req.params.id === req.payload?._id) {
        return next();
    }

    next(new BizProductsError(403, "Only the user is allowed"));
};

export const isSelf = [validateToken, _isSelf];

