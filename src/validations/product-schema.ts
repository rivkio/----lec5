import Joi from "joi";
import { IProductInput } from "../@types/@types";
import { imageSchema } from "./user-schema";

const productSchema = Joi.object<IProductInput>({
    productName: Joi.string().min(2).max(256).required(),
    subtitle: Joi.string().min(2).max(256).required(),
    productDescription: Joi.string().min(2).max(1024).required(),
    price: Joi.number().required(),
    color: Joi.array().items(Joi.string().min(2).max(50)).required(),
    sizes: Joi.array().items(Joi.number()).required(),
    model: Joi.string().min(2).max(50).required(),
    image: imageSchema,
    alt: Joi.string().required().min(2).max(1024),
    category: Joi.string().valid("boys", "girls").required(),
    quantity: Joi.number().required(),
});

export default productSchema;