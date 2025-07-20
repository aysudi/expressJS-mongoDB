import mongoose from "mongoose";
import bookSchema from "../schemas/booksSchema.js";

const BookModel = mongoose.model("Book", bookSchema);

export default BookModel;
