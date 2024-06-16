import { Router } from "express";
import { validateBusiness, validateCard } from "../middleware/joi";
import { cardService } from "../services/card-service";
import { isBusiness } from "../middleware/is-business";
import BizCardsError from "../errors/BizCardsError";
import { validateToken } from "../middleware/validate-token";
import { isCardOwner } from "../middleware/is-card-owner";
import { isCardOwnerOrAdmin } from "../middleware/is-card-owner-or-admin";

const router = Router();

//delete card
router.delete("/:id", ...isCardOwnerOrAdmin, validateToken, async (req, res, next) => {
    try {
        const card = await cardService.deleteCard(req.body, req.params.id);
        res.json(card);
    } catch (e) {
        next(e);
    }
});


//like card
// router.patch("/:id", validateToken, async (req, res, next) => {
//     try {
//         const card = await cardService.likeCard(req.payload._id);
//         res.json(card);
//     } catch (e) {
//         next(e);
//     }
// });


router.patch("/:id/favorite", validateToken, async (req, res, next) => {
    try {
        const userId = req.payload._id;
        const cardId = req.params.id;
        const user = await cardService.toggleFavorite(userId, cardId);
        res.json(user);
    } catch (e) {
        next(e);
    }
});



//update card
router.put("/:id", ...isCardOwner, validateCard, async (req, res, next) => {
    try {
        const card = await cardService.updateCard(req.body, req.payload._id);
        res.json(card);
    } catch (e) {
        next(e);
    }
});


//get all my cards
router.get("/my-cards", validateToken, async (req, res, next) => {
    try {
        const cards = await cardService.getCardByUserId(req.payload._id);
        res.json(cards);
    } catch (e) {
        next(e);
    }
});


router.post("/", ...isBusiness, validateCard, async (req, res, next) => {
    try {
        const result = await cardService.createCard(req.body, req.payload._id);
        res.status(201).json(result);
    } catch (e) {
        next(e);
    }
});

//get all cards
router.get("/", async (req, res, next) => {
    try {
        const cards = await cardService.getAllCards();
        res.json(cards);
    } catch (e) {
        next(e);
    }
});

//get card by id
router.get("/:id", async (req, res, next) => {
    try {
        const card = await cardService.getCardById(req.params.id);

        if (!card) {
            throw new BizCardsError(400, "No such card id");
            //     return next(new BizCardsError(400, "No such card id"));
        }
        res.json(card);
    } catch (e) {
        next(e);
    }
});



export { router as cardRouter };