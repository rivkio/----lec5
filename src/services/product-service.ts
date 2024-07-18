import _ from "underscore";
import { IProductInput } from "../@types/@types";
import Product from "../db/models/product-model";
import BizProductsError from "../errors/BizProductsError";
import User from "../db/models/user-model";

const generateBizNumber = async () => {
    //generate random bizNumber:
    while (true) {
        const r = _.random(1_000_000, 9_999_999);
        const dbRes = await Product.findOne({ bizNumber: r });
        if (!dbRes) {
            return r;
        }
    }
};

export const productService = {
    createProduct: async (data: IProductInput, userId: string) => {

        // Check if the product already exists
        const existingProduct = await Product.findOne({ productName: data.productName, userId });
        if (existingProduct) {
            throw new BizProductsError(400, "Product already exists");
        }

        //userId is extracted from the JWT
        const product = new Product(data);
        //assign user id to the product:
        product.userId = userId;
        //generate biz number to the product:
        product.barcode = await generateBizNumber();

        return product.save();
    },

    // createProduct: async (data: IProductInput, userId: string) => {

    //     // בדיקה אם המוצר כבר קיים
    //     const existingProduct = await Product.findOne({ productName: data.productName, userId });
    //     if (existingProduct) {
    //         throw new BizProductsError(400, "Product already exists");
    //     }

    //     // יצירת אובייקט מוצר חדש עם הנתונים שהתקבלו מהבקשה
    //     const product = new Product({
    //         ...data,  // כול הנתונים שהתקבלו מהבקשה
    //         userId,   // מזהה המשתמש
    //         barcode: await generateBizNumber()  // יצירת ברקוד חדש למוצר
    //     });

    //     // שמירת המוצר במסד הנתונים
    //     return product.save();
    // },


    //get all products
    getAllProducts: async () => Product.find(),

    //get product by id
    getProductById: async (id: string) => Product.findById(id),

    //get all my products
    getProductByUserId: async (userId: string) => Product.find({ userId: userId }),

    //update product
    updateProduct: async (id: string, data: FormData) => {
        const product = await Product.findOneAndUpdate({ _id: id, }, data, { new: true });
        return product;
    },



    toggleShoppingCart: async (userId: string, productId: string) => {
        const user = await User.findById(userId);
        const product = await Product.findById(productId);

        // Ensure that productId is a string before comparison
        const productIdStr = productId.toString();

        // Find the product in the cart, checking if productId exists and is a string
        const productInCart = user.cart.find(item => item.productId?.toString() === productIdStr);

        if (productInCart) {
            // Remove the product from the cart
            user.cart = user.cart.filter(item => item.productId?.toString() !== productIdStr);
            
        } else {
            // Add the product to the cart, ensuring all necessary properties are included
            user.cart.push({
                productId: product._id.toString(),
                productName: product.productName,
                price: product.price,
            });
        }

        await user.save();
        return user.cart;
    },


    getShoppingCart: async (userId: string) => {
        const user = await User.findById(userId);
        if (user) {
            return user.cart;
        } else {
            throw new BizProductsError(400, "User not found");
        }
    },


    //delete product
    deleteProduct: async (data, id: string) => Product.findOneAndDelete({ _id: id }, data),



    bulkReplenishStock: async (updates: { id: string; sizes: number[]; quantity: number }[]) => {
        if (!Array.isArray(updates) || updates.length === 0) {
            throw new BizProductsError(400, "Updates must be a non-empty array");
        }
        const results = [];

        for (const update of updates) {
            if (!update.id || !update.sizes || !update.quantity) {
                throw new BizProductsError(400, "Each update must include id, size, and quantity");
            }
            if (update.quantity <= 0) {
                throw new BizProductsError(400, "Quantity must be greater than 0");
            }

            const product = await Product.findById(update.id);
            if (!product) throw new BizProductsError(404, `Product not found: ${update.id}`);
            if (!update.sizes.every(size => [2, 4, 6, 8, 10, 12].includes(size))) {
                throw new BizProductsError(400, `Invalid size: ${update.sizes}`);
            }
            product.sizes = [...new Set([...product.sizes, ...update.sizes])];
            product.quantity += update.quantity;
            await product.save();
            results.push(product);
        }
        return results;
    },


};

