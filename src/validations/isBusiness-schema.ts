import Joi from "joi";
import { IIsBusiness } from "../@types/@types";


const isBusinessSchema = Joi.object<IIsBusiness>({
    isBusiness: Joi.boolean().required(),
});

export default isBusinessSchema;