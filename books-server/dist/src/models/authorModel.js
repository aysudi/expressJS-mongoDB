import mongoose from "mongoose";
import authorSchema from "../schemas/authorSchema.js";
const AuthorModel = mongoose.model("Author", authorSchema);
export default AuthorModel;
