import cardJoiSchema from "../../validations/card-schema";
import isBusinessSchema from "../../validations/isBusiness-schema";
import loginSchema from "../../validations/login-schema";
import userSchema from "../../validations/user-schema";
import { validateSchema } from "./validate-schema";

export const validateUser = validateSchema(userSchema);
export const validateLogin = validateSchema(loginSchema);
export const validateCard = validateSchema(cardJoiSchema);
export const validateBusiness = validateSchema(isBusinessSchema);