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

