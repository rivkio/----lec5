import Product from "../db/models/product-model";

export const analyticsService = {

    //להחזיר רשימה של כל המוצרים במלאי כולל השם, הכמות שנמצאת במלאי, וכמות המוצרים שנמכרו.
    getInventory: async () => {
        const products = await Product.find();
        return products.map(product => ({
            productName: product.productName,
            quantity: product.quantity,
            sold: product.sold,
        }));
    },

    //להחזיר את הסכום הכולל של כל המוצרים שנמכרו
    getTotalSold: async () => {
        const products = await Product.find();
        return products.reduce((acc, product) => acc + product.sold, 0);
    },

    //להחזיר את הכמות שנמכרה עבור מוצר מסוים
    getProductSales: async (productId: string) => {
        const product = await Product.findById(productId);
        if (!product) throw new Error("Product not found");
        return {
            productName: product.productName,
            sold: product.sold,
        };
    },

    //get Sales By Date
    getSalesByDate: async (date: Date) => {
        const products = await Product.find({ createdAt: date });
        return products.map(product => ({
            productName: product.productName,
            sold: product.sold,
        }));
    },

    //להחזיר את המוצרים שלא נמכרו עדיין
    getUnsoldProducts: async () => {
        const products = await Product.find({ sold: 0 });
        return products.map(product => ({
            productName: product.productName,
            quantity: product.quantity,
        }));
    },

    //להחזיר את המוצרים שנמצאים במלאי יותר ממחיר מסוים
    getProductsInventoryAbovePrice: async (price: number) => {
        const products = await Product.find({ price: { $gt: price } });
        return products.map(product => ({
            productName: product.productName,
            price: product.price,
        }));
    },

    //להחזיר את המוצרים שנמצאים במלאי פחות ממחיר מסוים
    getProductsInventoryBelowPrice: async (price: number) => {
        const products = await Product.find({ price: { $lt: price } });
        return products.map(product => ({
            productName: product.productName,
            price: product.price,
        }));
    },

    // להחזיר את המוצרים שנמכרו בקטגוריה מסוימת
    getProductsByCategory: async (category: string) => {
        const products = await Product.find({ category });
        return products.map(product => ({
            productName: product.productName,
            category: product.category,
            sold: product.sold,
        }));
    },













    // //להחזיר את המוצרים שנמכרו יותר מכמות מסוימת
    // getProductsBySales: async (quantity: number) => {
    //     const products = await Product.find({ quantity: { $gt: quantity } });
    //     return products.map(product => ({
    //         productName: product.productName,
    //         quantity: product.quantity,
    //     }));
    // },


    // //להחזיר את המוצרים שנמצאים במלאי פחות מכמות מסוימת
    // getProductsByInventory: async (quantity: number) => {
    //     const products = await Product.find({ quantity: { $lt: quantity } });
    //     return products.map(product => ({
    //         productName: product.productName,
    //         quantity: product.quantity,
    //     }));
    // },




};