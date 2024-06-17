import { ValidationError } from 'joi';
import { ErrorRequestHandler } from "express";
import { MongoServerError } from "mongodb";
import { CastError } from "mongoose";
import BizProductsError from '../errors/BizProductsError';
import { error } from 'console';


const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err)

    //my error
    if (err instanceof BizProductsError) {
        return res.status(err.status).json(err);
    }

    if (err instanceof MongoServerError && err.code === 11000) {
        return res.status(400).json({
            message: "duplicate key - must be unique",
            value: err.keyValue,
        });
    }

    //Invalid object ID:
    if (err && err.name && err.name == "CastError" && err.path && err.value) {
        return res
            .status(400)
            .json({ message: "Invalid object id", path: err.path, value: err.value });
    }

    //express json error
    if (err instanceof SyntaxError) {
        return res.status(400).json({ message: "Invalid JSON" });
    }

    if (err instanceof ValidationError) {
        return res.status(400).json({ message: err.message });
    }
    console.error(error)
    //internal server error
    return res.status(500).json(err);
};
export default errorHandler;