import Order from "../db/models/orders-model";
import Product from "../db/models/product-model";
import User from "../db/models/user-model";

export const analyticsService = {

    getInventory: async () => {
        const products = await Product.find();
        return products.map(product => ({
            productName: product.productName,
            quantity: product.quantity,
            sold: product.sold,
        }));
    },

    
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

   
    getSalesByDate: async (date: Date) => {
        const products = await Product.find({ createdAt: date });
        return products.map(product => ({
            productName: product.productName,
            sold: product.sold,
        }));
    },

    
    
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

   
    getProductsByCategory: async (category: string) => {
        const products = await Product.find({ category });
        return products.map(product => ({
            productName: product.productName,
            category: product.category,
            sold: product.sold,
        }));
    },



    getOrderByCreationDate: async () => {
        const orders = await Order.find().populate("products.productId");
        const sortedOrders = orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        return sortedOrders.map(order => ({
            orderNumber: order.orderNumber,
            createdAt: order.createdAt,
            products: order.products.map(product => ({
                productName: product.productName,
                quantity: product.quantity,
                price: product.price,
                age: product.age,
            })),
        }));
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



    getOrdersByTotalAmount: async () => {
        const orders = await Order.find().populate('products.productId');

        // Sort orders by total amount in descending order
        const sortedOrders = orders.sort((a, b) => b.totalAmount - a.totalAmount);

        // Calculate the total amount of all orders
        const totalAmount = orders.reduce((acc, order) => acc + order.totalAmount, 0);

        // Extract all productIds from the orders
        const productIds = orders.flatMap(order => order.products.map(product => product.productId));

        // Fetch all products related to the extracted productIds
        const products = await Product.find({ _id: { $in: productIds } });

        // Map through sorted orders to format the output
        return {
            orders: sortedOrders.map(order => ({
                orderNumber: order.orderNumber,
                totalAmount: order.totalAmount,
                products: order.products.map(product => {
                    
                    return {
                        productName: product.productName,
                        quantity: product.quantity,
                        price: product.price,
                        age: product.age,
                    };
                }),
            })),
            totalAmount,
        };
    },


     getUsersWithMostOrders: async () => {
        // שלב 1: איסוף ההזמנות לפי יוזר
        const orders = await Order.aggregate([
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
            const user = users.find(u => u._id.equals(order._id));
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
                        age: p.age
                    })),
                    createdAt: o.createdAt
                }))
            };
        });

        return result;
    },



};