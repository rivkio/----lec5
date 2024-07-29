import { IUser } from "../@types/@types";
import { Logger } from "../logs/logger";
import { productService } from "../services/product-service";
import { usersService } from "../services/users-service";
import { products, users } from "./initial-data";
import Product from "./models/product-model";
import User from "./models/user-model";

const initDB = async () => {
    try {
        const usersCount = await User.countDocuments();

        if (usersCount >= 3) {
            Logger.log("3 or more users already exist. Skipping user initialization.");
        } else {
            for (let u of users) {
                const existingUser = await User.findOne({ email: u.email });
                if (!existingUser) {
                    const saved = await usersService.createUser(u);
                    Logger.verbose(`User created: ${saved.email}`);
                } else {
                    Logger.log(`User already exists: ${existingUser.email}`);
                }
            }
        }

        const productsCount = await Product.countDocuments();
        if (productsCount >= 6) {
            Logger.log("6 or more products already exist. Skipping product initialization.");
            return;
        }

        const user = await User.findOne();
        if (!user) {
            Logger.error("No user found to associate products with.");
            return;
        }
        const userId = user._id.toString();

        for (let p of products) {

            const existingProduct = await Product.findOne({ productName: p.productName });
            if (!existingProduct) {
                const productData = { ...p, userId }; // הוספת מזהה המשתמש לכרטיס
                const savedProduct = await productService.createProduct(productData, userId);
                Logger.verbose(`Product created: ${savedProduct.productName}`);
            } else {
                Logger.log(`Product already exists: ${existingProduct.productName}`);
            }
        }


    } catch (e) {
        Logger.error(`Database initialization failed: ${e.message}`);
    }
};

export default initDB;













