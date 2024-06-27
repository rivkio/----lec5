import { v4 as uuidv4 } from 'uuid';
import { IOrderProduct } from "../@types/@types";
import Order from "../db/models/orders-model";
import Product from "../db/models/product-model";


export const orderService = {
    // Create new order
    createOrder: async (userId: string, products: IOrderProduct[]) => {
        try {
            const orderProducts = await Promise.all(products.map(async product => {
                const productDetails = await Product.findById(product.productId);
                if (!productDetails) throw new Error("Product not found");
                if (productDetails.quantity < product.quantity) throw new Error("Not enough stock");

                // Check if selected age is valid for the product
            //  const selectedAge = productDetails.ages.find(age => age === product.age);
            //     if (!selectedAge) throw new Error("Invalid age selected");

                const selectedAge = product.age;
                // console.log(productDetails.ages)
                // if (!productDetails.ages.includes(selectedAge)) {
                //     throw new Error(`Selected age ${selectedAge} is not valid for product ${productDetails.productName}`);
                // }

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

    //get order
    getOrder: async (orderId: string) => {
        const order = await Order.findById(orderId).populate("products.productId");
        if (!order) throw new Error("Order not found");
        return order;
    },

    //get order by user
    getOrdersByUser: async (userId: string) => {
        return Order.find({ userId }).populate("products.productId");
    },


    //get all orders
    getAllOrders: async () => {
        const orders = await Order.find().populate("products.productId");
        const count = await Order.countDocuments();
        return { orders: orders.map(order => order.toObject()), count };
    },

    
    // הזמנות לפי עלויות, תצוגה של הזמנות מסודרות לפי עלות כוללת, כולל פירוט מוצרים בכל הזמנה וסך כל העלויות
    // getOrdersByTotalAmount: async () => {
    //     const orders = await Order.find().populate('products.productId');
    //     const sortedOrders = orders.sort((a, b) => b.totalAmount - a.totalAmount);
    //     const totalAmount = orders.reduce((acc, order) => acc + order.totalAmount, 0);

    //     const products = await Product.find({ _id: { $in: orders.map(order => order.products.map(product => product.productId)) } });

    //     return {
    //         orders: sortedOrders.map(order => ({
    //             orderNumber: order.orderNumber,
    //             totalAmount: order.totalAmount,
    //             products: order.products.map(product => ({
    //                 productName: products.find(p => p._id.toString() === product.productId.toString()).productName,
    //                 quantity: product.quantity,
    //                 price: product.,
    //                 age: product.age,
    //             })),
    //         })),
    //         totalAmount,
    //     };
    //     },




    //להחזיר את היוזרים שבצעו את מספר הזמנות הכי גבוה כולל פירוט ההזמנות של כל יוזר וההכנסות מכל יוזר
getUserByOrdersCount: async () => {
    
}

};




    



