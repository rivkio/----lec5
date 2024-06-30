import { v4 as uuidv4 } from 'uuid';
import { IOrderProduct } from "../@types/@types";
import Order from "../db/models/orders-model";
import Product from "../db/models/product-model";
import BizProductsError from '../errors/BizProductsError';


export const orderService = {
  
    createOrder: async (userId: string, products: IOrderProduct[]) => {
        try {
            const orderProducts = await Promise.all(products.map(async product => {
                const productDetails = await Product.findById(product.productId);
                if (!productDetails) throw new  BizProductsError(400, "Product not found");
                if (productDetails.quantity < product.quantity) 
                    throw new BizProductsError(400, "Not enough stock");

                const selectedAge = product.age;
           
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
                    age: selectedAge,
                };
            }));

            // Calculate totalAmount
            const totalAmount = orderProducts.reduce((acc, product) => acc + (product.quantity * product.price), 0);

            // Generate unique order number
            const orderNumber = uuidv4();

            // Create new order document
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



    cancelOrder: async (orderId: string) => {
        const order = await Order.findById(orderId);
        if (!order) throw new BizProductsError(400, "Order not found");

        if (order.status === "cancelled") {
            throw new BizProductsError(400, "Order is already cancelled");
        }

        // Return the stock
        for (const product of order.products) {
            const productDetails = await Product.findById(product.productId);
            if (productDetails) {
                productDetails.quantity += product.quantity;
                productDetails.sold -= product.quantity;
                await productDetails.save();
            }
        }

        order.status = "cancelled";
        return await order.save();
    },




    getOrder: async (orderId: string) => {
        const order = await Order.findById(orderId).populate("products.productId");
        if (!order) throw new BizProductsError(400, "Order not found");
        return order;
    },


    getOrdersByUser: async (userId: string) => {
        return Order.find({ userId }).populate("products.productId");
    },


    getAllOrders: async () => {
        const orders = await Order.find(({ status: { $ne: "cancelled" } })).populate("products.productId");
        const count = await Order.countDocuments({ status: { $ne: "cancelled" } });
        return { orders: orders.map(order => order.toObject()), count };
    },


};




    



