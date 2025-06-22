import authorValidationSchema from "../validations/author.validation.js";
const authorValidate = (req, _, next) => {
    const { error } = authorValidationSchema.validate(req.body);
    if (error) {
        const errorMessage = error.details.map((err) => err.message).join(", ");
        throw new Error(errorMessage);
    }
    else {
        next();
    }
};
export default authorValidate;
