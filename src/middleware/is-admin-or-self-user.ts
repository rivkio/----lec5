import { RequestHandler } from "express";
import BizProductsError from "../errors/BizProductsError";
import { validateToken } from "./validate-token";


const _isAdminOrSelfUser: RequestHandler = (req, _, next) => {
    const requestedUserId = req.params.userId;
    const userId = req.payload._id;

    if (requestedUserId === userId || req.payload?.isAdmin) {
        return next();
    }

    next(new BizProductsError(403, "Must be the requested user or admin"));
};

export const isAdminOrSelfUser = [validateToken, _isAdminOrSelfUser];