import express from "express";
import logger from "../middlewares/logger.js";
import { deleteAuthor, getAuthorById, getAuthors, postAuthor, updateAuthor, } from "../controllers/authorsController.js";
import authorValidate from "../middlewares/authorValidate.js";
const authorRouter = express.Router();
authorRouter.get("/", logger, getAuthors);
authorRouter.get("/:id", getAuthorById);
authorRouter.post("/", authorValidate, postAuthor);
authorRouter.delete("/:id", deleteAuthor);
authorRouter.patch("/:id", updateAuthor);
export default authorRouter;
