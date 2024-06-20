import _ from "underscore";
import { IProductInput } from "../@types/@types";
import Product from "../db/models/product-model";

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
        //userId is extracted from the JWT
        const product = new Product(data);
        //assign user id to the product:
        product.userId = userId;
        //generate biz number to the product:
        product.barcode = await generateBizNumber();

        return product.save();
    },


    //get all products
    getAllProducts: async () => Product.find(),

    //get product by id
    getProductById: async (id: string) => Product.findById(id),

    //get all my products
    getProductByUserId: async (userId: string) => Product.find({ userId: userId }),

    //update product
    updateProduct: async (data: IProductInput, userId: string) => {
        return Product.updateOne({ userId: userId }, data);
    },
    //update's Tzofiya

    // updateProduct: async (id: string, data: IProductInput, userId: string) => {
    //     const product = await Product.findOneAndUpdate({ _id: id, userId: userId }, data, { new: true });
    //     if (!product) throw new Error("Product not found or user unauthorized to update this product");
    //     return product;
    // },

    //like a product
    // likeProduct: async (userId: string) => Product.find({ likes: userId }),


    toggleFavorite: async (userId: string, productId: string) => {
        const product = await Product.findById(productId);
        if (!product) throw new Error("Product not found");

        const isFavorite = product.ShoppingCart.includes(userId);
        if (isFavorite) {
            product.ShoppingCart = product.ShoppingCart.filter(fav => fav.toString() !== userId);
        } else {
            product.ShoppingCart.push(userId);
        }
        await product.save();
        return product;
    },



    //delete product
    deleteProduct: async (data, id: string) => Product.findOneAndDelete({ _id: id }, data),
};

