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

        if (usersCount > 3) return;

        for (let u of users) {

            const existingUser = await User.findOne({ email: u.email });
            if (!existingUser) {

                const saved = await usersService.createUser(u);
                Logger.verbose(saved);
            }
        }

        const productsCount = await Product.countDocuments();
        if (productsCount > 3) return;

        const user = await User.findOne();
        const userId = user._id.toString();

        for (let p of products) {

            const existingProduct = await Product.findOne({ productName: p.productName });
            if (!existingProduct) {

                const savedProduct = await productService.createProduct(p, userId);
                Logger.verbose(savedProduct);
            }
        }


    } catch (e) {
        Logger.log(e);
    }
};

export default initDB;













