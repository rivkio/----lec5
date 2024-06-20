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

    //להחזיר את מספר המוצרים שנמכרו עבור מוצר מסוים
    getProductSales: async (productId: string) => {
        const product = await Product.findById(productId);
        if (!product) throw new Error("Product not found");
        return {
            productName: product.productName,
            sold: product.sold,
        };
    },
};