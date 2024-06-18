import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Orders from '../db/models/orders-model';

dotenv.config({ path: './config/dev.env' });

export const calculateTotalProductsPurchased = async () => {

    try {
        // חיבור לבסיס הנתונים
        await mongoose.connect(process.env.DB_CONNECTION_STRING as string);

        // שליפת כל ההזמנות
        const orders = await Orders.find();

        // חישוב סך המוצרים שנרכשו
        let totalProductsPurchased = 0;
        orders.forEach((order) => {
            order.orderItems.forEach((item) => {
                totalProductsPurchased += item.quantity;
            });
        });

        console.log(`Total products purchased across all orders: ${totalProductsPurchased}`);
    } catch (e) {
        console.error('Error calculating total products purchased:', e);
    }

};
