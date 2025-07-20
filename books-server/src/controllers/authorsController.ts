import { NextFunction, Request, Response } from "express";
import formatMongoData from "../utils/formatMongoData.js";
import {
  deleteOne,
  getAll,
  getOne,
  post,
  update,
} from "../services/authorService.js";

// get all authors
export const getAuthors = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authors = await getAll();

    const formattedAuthors = authors.map((author) => {
      const authorObj = author.toObject() as any;

      const formattedBook = formatMongoData(authorObj.books);

      return {
        ...formatMongoData(authorObj),
        books: formattedBook,
      };
    });

    res.status(200).json(formatMongoData(formattedAuthors));
  } catch (error) {
    next(error);
  }
};

// get one author
export const getAuthorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const author = await getOne(id);

    if (!author) throw new Error("author is not found");

    const authorObj = author.toObject() as any;
    const formattedBooks = formatMongoData(authorObj.books);
    const formattedAuthor = {
      ...formatMongoData(authorObj),
      books: formattedBooks,
    };

    res.status(200).json(formatMongoData(formattedAuthor));
  } catch (error) {
    next(error);
  }
};

// post author
export const postAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newAuthor = await post(req.body);
    res.status(201).json(formatMongoData(newAuthor));
  } catch (error) {
    next(error);
  }
};

// delete author
export const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const author = await getOne(id);
    if (!author) throw new Error("author is not found");

    const relaredBooks = (author as any).books;
    if (relaredBooks.length > 0) {
      throw new Error("Cannot delete this author, it has related books");
    } else {
      const deletedAuthor = await deleteOne(id);
      if (!deletedAuthor) throw new Error("author is not found");
      res.status(200).json(formatMongoData(deletedAuthor));
    }
  } catch (error) {
    next(error);
  }
};

// uppdate author
export const updateAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updatedAuthor = { ...req.body };
    const updateAuthorResponse = await update(id, updatedAuthor);

    res.status(200).json(formatMongoData(updateAuthorResponse));
  } catch (error) {
    next(error);
  }
};
