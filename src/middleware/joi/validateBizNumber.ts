import Joi from 'joi';

const validateBizNumber = (req, res, next) => {
    const schema = Joi.object({
        bizNumber: Joi.string().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: 'bizNumber is required' });
    }

    next();
};
export default validateBizNumber;


// import { RequestHandler } from "express";
// import { ObjectSchema } from "joi";

// type validateBizNumber = (schema: ObjectSchema) => RequestHandler;

// export const validateSchema: validateBizNumber = (schema: ObjectSchema) => async (req, res, next) => {
//     try {
//         await schema.validateAsync(req.body);
//         next();
//     } catch (e) {
//         next(e);
//     }
// };
