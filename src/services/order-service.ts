import { v4 as uuidv4 } from 'uuid';
import { IOrderProduct } from "../@types/@types";
import Order from "../db/models/orders-model";
import Product from "../db/models/product-model";


export const orderService = {

    //create new order
    createOrder: async (userId: string, products: IOrderProduct[]) => {
        try {
            const orderProducts = await Promise.all(products.map(async product => {
                const productDetails = await Product.findById(product.productId);
                if (!productDetails) throw new Error("Product not found");
                if (productDetails.quantity < product.quantity) throw new Error("Not enough stock");

                // Update product stock
                productDetails.quantity -= product.quantity;
                productDetails.sold += product.quantity;
                await productDetails.save();

                return {
                    productId: product.productId,
                    productName: productDetails.productName,
                    barcode: productDetails.barcode,
                    quantity: product.quantity,
                    price: productDetails.price,
                };
            }));

            // Calculate totalAmount
            const totalAmount = orderProducts.reduce((acc, product) => acc + (product.quantity * product.price), 0);

            const orderNumber = uuidv4();

            const order = new Order({
                orderNumber,
                userId,
                products: orderProducts,
                totalAmount,
            });

            return await order.save();
        } catch (error) {
            console.error("Error creating order:", error.message);
            throw error;
        }
    },

    //get order
    getOrder: async (orderId: string) => {
        const order = await Order.findById(orderId).populate("products.productId");
        if (!order) throw new Error("Order not found");
        return order;
    },

    //get order by user
    getOrdersByUser: async (userId: string) => {
        return Order.find({ userId }).populate("products.productId");
    }
};



