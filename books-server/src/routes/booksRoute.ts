import express from "express";
import {
  deleteBook,
  getBookById,
  getBooks,
  postBook,
  updateBook,
} from "../controllers/booksController.js";
import bookValidate from "../middlewares/bookValidate.js";
import uploadMiddleware from "../middlewares/uploadMiddleware.js";
import verifyToken from "../middlewares/authToken.js";
import verifyRole from "../middlewares/authRole.js";
import roles from "../constants/userRoles.js";

const bookRouter = express.Router();
const upload = uploadMiddleware("books");

bookRouter.get(
  "/",
  // verifyToken,
  // verifyRole([roles.admin, roles.customer]),
  getBooks
);
bookRouter.get("/:id", getBookById);
bookRouter.post(
  "/",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "bookPDF", maxCount: 1 },
  ]),
  bookValidate,
  postBook
);
bookRouter.delete("/:id", deleteBook);
bookRouter.patch(
  "/:id",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "bookPDF", maxCount: 1 },
  ]),
  updateBook
);

export default bookRouter;
