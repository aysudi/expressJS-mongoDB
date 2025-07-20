import Joi from "joi";
import joiObjectId from "joi-objectid";
const JoiObjectId = joiObjectId(Joi);
const authorValidationSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
        "string.base": "Author name must be a string.",
        "string.min": "Author name must be at least 3 characters long.",
        "string.max": "Author name cannot be longer than 100 characters.",
        "any.required": "Author name is required.",
    })
        .required(),
    bio: Joi.string()
        .max(500)
        .messages({
        "string.base": "Author bio must be a string.",
        "string.max": "Author bio cannot be longer than 500 characters.",
    })
        .required(),
});
export default authorValidationSchema;
