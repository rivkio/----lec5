import productJoiSchema from "../../validations/product-schema";
import loginSchema from "../../validations/login-schema";
import userSchema, { updateUserSchema } from "../../validations/user-schema";
import { validateSchema } from "./validate-schema";
import joiMessageSchema from "../../validations/message-schema";

export const validateUser = validateSchema(userSchema);
export const validateUpdateUser = validateSchema(updateUserSchema);
export const validateLogin = validateSchema(loginSchema);
export const validateProduct = validateSchema(productJoiSchema);
export const validateMessage = validateSchema(joiMessageSchema);