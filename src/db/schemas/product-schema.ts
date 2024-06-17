import { Schema } from "mongoose";
import { IProduct } from "../../@types/@types";
import addressSchema from "./address-schema";
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

    likes: [
        {
            type: String,
        },
    ],
    createdAt: { type: Date, required: false, default: new Date() },
    userId: { type: String, required: true },
    bizNumber: { type: Number, required: true, min: 1_000_000, max: 9_999_999 },


    ShoppingCart: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default productSchema;