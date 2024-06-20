import { IOrderProduct } from "../@types/@types";
import Order from "../db/models/orders-model";
import Product from "../db/models/product-model";

export const orderService = {

    //create new order
    createOrder: async (userId: string, products: IOrderProduct[]) => {
        try {
            // מבטיח שכל המוצרים יטופלו בו זמנית
            const orderProducts = await Promise.all(products.map(async product => {
                // מוצא את פרטי המוצר על פי מזהה המוצר
                const productDetails = await Product.findById(product.productId);
                if (!productDetails) throw new Error("Product not found");
                // בדיקה אם הכמות במלאי מספיקה
                if (productDetails.quantity < product.quantity) throw new Error("Not enough stock");

                // עדכון כמות המוצרים במלאי
                productDetails.quantity -= product.quantity;
                // עדכון כמות המוצרים שנמכרו
                productDetails.sold += product.quantity;
                // שמירת עדכוני המוצר בבסיס הנתונים
                await productDetails.save();

                // החזרת פרטי המוצר הנדרשים להזמנה
                return {
                    productId: product.productId,
                    title: productDetails.productName,
                    barcode: productDetails.barCode,
                    quantity: product.quantity,
                    price: productDetails.price,
                };
            }));



            // חישוב הסכום הכולל של ההזמנה
            const totalAmount = orderProducts.reduce((acc, product) => acc + (product.quantity * product.price), 0);

            // יצירת אובייקט הזמנה חדש עם המשתמש, המוצרים והסכום הכולל
            const order = new Order({
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



