import { NextFunction, Request, Response } from "express";
import {
  deleteOne,
  getAll,
  getOne,
  post,
  update,
} from "../services/bookService.js";
import formatMongoData from "../utils/formatMongoData.js";
import {
  update as updateAuthor,
  getOne as getAuthor,
} from "../services/authorService.js";
import BookModel from "../models/booksModel.js";
import { SortOrder } from "mongoose";

// get all books
export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      search = "",
      sortBy = "price",
      order = "asc",
    } = req.query as {
      search?: string;
      sortBy?: string;
      order?: string;
      page?: string;
      limit?: string;
    };

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 3;

    const allowedSortFields = ["price", "title", "createdAt"];
    const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : "price";
    const sortOrder: SortOrder = order === "desc" ? -1 : 1;

    const filter = search
      ? {
          $or: [{ title: { $regex: search, $options: "i" } }],
        }
      : {};

    const books = await getAll(page, limit, safeSortBy, sortOrder, filter);
    const total = await BookModel.countDocuments(filter);

    const formattedBooks = books.map((book) => {
      const formattedAuthor =
        typeof book.author === "object"
          ? formatMongoData(book.author)
          : book.author;

      return {
        ...formatMongoData(book),
        author: formattedAuthor,
      };
    });

    res.status(200).json({
      totalData: total,
      page,
      totalPages: Math.ceil(total / limit),
      data: formattedBooks,
    });
  } catch (error) {
    next(error);
  }
};

// get one book
export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const book = await getOne(id);

    if (!book) throw new Error("book is not found");

    const bookObj = book.toObject();
    const formattedAuthor = formatMongoData(bookObj.author);
    const formattedBook = {
      ...formatMongoData(bookObj),
      author: formattedAuthor,
    };

    res.status(200).json(formattedBook);
  } catch (error) {
    next(error);
  }
};

// post book
export const postBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newBook = await post(req.body);
    const author = await getAuthor(req.body.author);
    if (!author) throw new Error("author not found");

    res.status(201).json(formatMongoData(newBook));
  } catch (error) {
    next(error);
  }
};

// delete book
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedBook = await deleteOne(id);
    if (!deletedBook) throw new Error("book is not found");

    res.status(200).json(formatMongoData(deletedBook));
  } catch (error) {
    next(error);
  }
};

// uppdate book
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updatedBook = { ...req.body };
    const updateBookResponse = await update(id, updatedBook);

    res.status(200).json(formatMongoData(updateBookResponse));
  } catch (error) {
    next(error);
  }
};
