import { RequestHandler } from "express";
import BizProductsError from "../errors/BizProductsError";
import { productService } from "../services/product-service";



const isProductId: RequestHandler = async (req, res, next) => {
    const product = await productService.getProductById(req.params.id);
    if (product) {
        return next();
    }
    next(new BizProductsError(400, "Product is not found"));
}
export default isProductId;