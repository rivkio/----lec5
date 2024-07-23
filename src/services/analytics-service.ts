import Order from "../db/models/orders-model";
import Product from "../db/models/product-model";
import User from "../db/models/user-model";
import BizProductsError from "../errors/BizProductsError";

export const analyticsService = {

    getInventory: async () => {
        const products = await Product.find();
        return products.map(product => ({
            productName: product.productName,
            color: product.color,
            quantity: product.quantity,
            sold: product.sold,
        }));
    },


    getTopSellingProducts: async () => {
        const products = await Product.find().sort({ sold: -1 }).limit(10);
        return products.map(product => ({
            productName: product.productName,
            sold: product.sold,
            price: product.price,
            totalRevenue: product.sold * product.price  // חישוב סך ההכנסות
        }));
    },


    getProductSales: async (productId: string) => {
        const product = await Product.findById(productId);
        if (!product) throw new BizProductsError(400, "Product not found");
        return {
            productName: product.productName,
            sold: product.sold,
        };
    },

    getSalesByDate: async (startDate: Date, endDate: Date) => {
        if (!startDate || !endDate) {
            throw new BizProductsError(400, "Start date and end date are required");
        }
        if (new Date(endDate) < new Date(startDate)) {
            throw new BizProductsError(400, "End date cannot be earlier than start date");
        }

        // הוספת יום אחד לתאריך הסיום כדי לכלול את כל היום הנוכחי
        const adjustedEndDate = new Date(endDate);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

        const salesByDate = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate), // תאריך התחלה
                        $lte: adjustedEndDate,   // תאריך סיום כולל את כל היום הנוכחי
                    },
                    status: { $ne: "cancelled" } // לא כולל הזמנות מבוטלות
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // קיבוץ לפי יום
                    totalAmount: { $sum: "$totalAmount" }, // סכום כל הכסף שנכנס
                    totalSales: { $sum: 1 }, // סך כל המכירות
                },
            },
            {
                $sort: { _id: 1 }, // מיון לפי תאריך עולה
            },
        ]);
        const overallSales = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate), // תאריך התחלה
                        $lte: adjustedEndDate,   // תאריך סיום כולל את כל היום הנוכחי
                    },
                    status: { $ne: "cancelled" } // לא כולל הזמנות מבוטלות
                },
            },
            {
                $group: {
                    _id: null, // קיבוץ כל המסמכים יחד
                    totalAmount: { $sum: "$totalAmount" }, // סכום כל הכסף שנכנס
                    totalSales: { $sum: 1 }, // סך כל המכירות
                },
            },
        ]);
        return {
            salesByDate,
            overallSales: overallSales[0] || { totalAmount: 0, totalSales: 0 },
        };
    },

    getOrderStatus: async () => {
        const orders = await Order.find({}, { status: 1 }); // נביא רק את השדה status
        console.log("Orders statuses:", orders);

        const statuses = await Order.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        console.log("Grouped statuses:", statuses);
        return statuses;
    },

    updateOrderStatus: async (orderId: string, status: string) => {
        const validStatuses = ["pending", "approved", "processing", "shipped", "delivered", "cancelled", "returned", "completed"];

        if (!status) {
            throw new BizProductsError(400, "Status is required");
        }

        if (!validStatuses.includes(status)) {
            throw new BizProductsError(400, "Invalid status");
        }

        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            throw new BizProductsError(400, "Order not found");
        }

        return order;
    },

    getProductsByCategory: async (category: string) => {
        const filter =  { category };
        const products = await Product.find(filter);

        return products.map(product => ({
            productName: product.productName,
            category: product.category,
            sold: product.sold,
        }));
    },

    getProductsInventoryAbovePrice: async (price: number) => {
        const products = await Product.find({ price: { $gt: price } });
        return products.map(product => ({
            productName: product.productName,
            price: product.price,
        }));
    },

    getProductsInventoryBelowPrice: async (price: number) => {
        const products = await Product.find({ price: { $lt: price } });
        return products.map(product => ({
            productName: product.productName,
            price: product.price,
        }));
    },

    getUsersWithMostOrders: async () => {
        // שלב 1: איסוף ההזמנות לפי יוזר
        const orders = await Order.aggregate([
            {
                $match: { status: { $ne: 'cancelled' } } // סינון ההזמנות המבוטלות
            },
            {
                $group: {
                    _id: "$userId",
                    orders: { $push: "$$ROOT" },
                    totalOrders: { $sum: 1 },
                    totalAmount: { $sum: "$totalAmount" }
                }
            },
            {
                $sort: { totalOrders: -1 } // סידור לפי מספר ההזמנות בסדר יורד
            }
        ]);
        // שלב 2: איסוף פרטי היוזרים
        const userIds = orders.map(order => order._id);
        const users = await User.find({ _id: { $in: userIds } });
        // שלב 3: מיפוי התוצאות לפורמט הרצוי
        const result = orders.map(order => {
            const user = users.find(u => u._id.toString() === order._id.toString());
            return {
                userId: order._id,
                userName: user ? user.name : 'Unknown User',
                totalOrders: order.totalOrders,
                totalAmount: order.totalAmount,
                orders: order.orders.map(o => ({
                    orderNumber: o.orderNumber,
                    totalAmount: o.totalAmount,
                    products: o.products.map(p => ({
                        productId: p.productId,
                        productName: p.productName,
                        quantity: p.quantity,
                        price: p.price,
                        size: p.size,
                    })),
                    createdAt: o.createdAt
                }))
            };
        });
        return result;
    },
};