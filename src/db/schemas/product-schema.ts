import { Schema } from "mongoose";
import { IProduct, IVariant } from "../../@types/@types";
import imageSchema from "./image-schema";

// הגדרת סקימה לגרסאות
const VariantSchema = new Schema<IVariant>({
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});

const productSchema = new Schema<IProduct>({
    productName: { type: String, required: true, minlength: 2, maxlength: 256 },
    subtitle: { type: String, required: true, minlength: 2, maxlength: 256 },
    productDescription: { type: String, required: true, minlength: 2, maxlength: 1024 },
    image: {
        url: { type: String, required: true },
    },
    alt: { type: String, required: true },
    barcode: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    shoppingCart: [{ type: String }],
    sold: { type: Number, default: 0 },
    userId: { type: String, required: true },
    variants: [VariantSchema], // Array of embedded documents
    // color: { type: String, required: true, minlength: 2, maxlength: 50 },
    // sizes: {
    //     type: [String], // שינוי לסוג מערך של מספרים
    //     enum: ['2', '4', '6', '8'], // ציון הערכים המותרים
    //     required: true
    // },
    // model: { type: String, required: true, minlength: 2, maxlength: 50 },
    // category: { type: String, required: true, enum: ["boys", "girls"] },
});

export default productSchema;