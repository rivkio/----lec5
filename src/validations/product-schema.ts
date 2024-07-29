import Joi from "joi";
import { IProductInput, IVariant } from "../@types/@types";
import { imageSchema } from "./user-schema";


const variantSchema = Joi.object<IVariant>({
    size: Joi.string().valid("S", "M", "L").required(),
    quantity: Joi.number().min(1).max(10000).required(),
    price: Joi.number().min(1).max(10000).required(),
});

const productSchema = Joi.object<IProductInput>({
    productName: Joi.string().min(2).max(256).required(),
    subtitle: Joi.string().min(2).max(256).required(),
    productDescription: Joi.string().min(2).max(1024).required(),
    variants: Joi.array().items(variantSchema).required(),
    // price: Joi.number().required(),
    // color: Joi.string().min(2).max(50).required(),
    // sizes: Joi.array().items(Joi.string().valid('2','4','6','8')).required(), 
    // model: Joi.string().min(2).max(50).required(),
    image: imageSchema.required(),
    alt: Joi.string().required().min(2).max(256),
    // category: Joi.string().valid("boys", "girls").required(),
    // quantity: Joi.number().required(),
});

export default productSchema;