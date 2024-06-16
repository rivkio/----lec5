import { RequestHandler } from "express";
import { validateToken } from "./validate-token";
import BizCardsError from "../errors/BizCardsError";
import { cardService } from "../services/card-service";

const _isCardOwner: RequestHandler = async (req, _, next) => {
    const card = await cardService.getCardById(req.params.id);
    const userId = req.payload._id;

    if (card.userId === userId) {
        // console.log(card.userId, userId);
        return next();

    }

    else next(new BizCardsError(403, "Only the card owner is allowed"))
    // console.log(card.userId, userId);
};

export const isCardOwner = [validateToken, _isCardOwner];




