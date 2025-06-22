import Joi from "joi";
import joiObjectId from "joi-objectid";

const JoiObjectId = joiObjectId(Joi);

const bookValidationSchema = Joi.object({
  title: Joi.string().min(2).required(),
  author: JoiObjectId().required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().required(),
  downloadURL: Joi.string().required(),
  ratings: Joi.array(),
  comments: Joi.array(),
  digital: Joi.boolean(),
  requiresLogin: Joi.boolean(),
});

export default bookValidationSchema;
