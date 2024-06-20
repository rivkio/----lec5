import { Schema } from "mongoose";
import { IProduct } from "../../@types/@types";
import imageSchema from "./image-schema";

const productSchema = new Schema<IProduct>({
    productName: { type: String, required: true, minlength: 2, maxlength: 256 },
    subtitle: { type: String, required: true, minlength: 2, maxlength: 256 },
    productDescription: { type: String, required: true, minlength: 2, maxlength: 1024 },
    price: { type: Number, required: true, /* min: 0, max: 1_000_000 */ },
    color: { type: String, required: true, minlength: 2, maxlength: 50 },
    sizes: { type: [Number], required: true },
    model: { type: String, required: true, minlength: 2, maxlength: 50 },
    ages: { type: [Number], required: true },
    web: { type: String, required: false, minlength: 14, maxlength: 100 },
    image: { type: imageSchema, required: true },
    category: { type: String, required: true, enum: ["boys", "girls"] },
    
    barcode: { type: Number, required: true, min: 1_000_000, max: 9_999_999 },
    createdAt: { type: Date, required: false, default: new Date() },
    ShoppingCart: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    quantity: { type: Number, required: true },
    sold: { type: Number, default: 0 },
    userId: { type: String, required: true },

});

export default productSchema;