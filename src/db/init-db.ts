import { IUser } from "../@types/@types";
import { Logger } from "../logs/logger";
import { cardService } from "../services/card-service";
import { usersService } from "../services/users-service";
import { cards, users } from "./initial-data";
import Card from "./models/card-model";
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

        const cardsCount = await Card.countDocuments();
        if (cardsCount > 3) return;

        const user = await User.findOne();
        const userId = user._id.toString();

        for (let c of cards) {

            const existingCard = await Card.findOne({ title: c.title });
            if (!existingCard) {

                const savedCard = await cardService.createCard(c, userId);
                Logger.verbose(savedCard);
            }
        }


    } catch (e) {
        Logger.log(e);
    }
};

export default initDB;













