import { NextFunction, Request, Response } from "express";
import {
  deleteOne,
  getAll,
  getOne,
  post,
  update,
} from "../services/bookService.js";
import formatMongoData from "../utils/formatMongoData.js";
import { getOne as getAuthor } from "../services/authorService.js";
import BookModel from "../models/booksModel.js";
import { SortOrder } from "mongoose";
import { v2 as cloudinary } from "cloudinary";

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
): Promise<void> => {
  try {
    const files = req.files as {
      coverImage?: Express.Multer.File[];
      bookPDF?: Express.Multer.File[];
    };

    const coverImageUrl = files.coverImage?.[0]?.path;
    const bookPdfUrl = files.bookPDF?.[0]?.path;

    const coverImagePublicId = files.coverImage?.[0]?.filename;
    const bookPdfPublicId = files.bookPDF?.[0]?.filename;

    if (!coverImageUrl || !bookPdfUrl) {
      res.status(400).json({ error: "Missing uploaded files" });
      return;
    }

    const bookData = {
      ...req.body,
      coverImage: coverImageUrl,
      coverImagePublicId: coverImagePublicId,
      bookPDF: bookPdfUrl,
      bookPDFPublicId: bookPdfPublicId,
    };

    const author = await getAuthor(req.body.author);
    if (!author) throw new Error("author not found");

    const newBook = await post(bookData);
    res.status(201).json({
      message: "created new book",
      data: formatMongoData(newBook),
    });
  } catch (error) {
    next(error);
  }
};

// delete book
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const book = await getOne(id);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    if (book.coverImagePublicId) {
      await cloudinary.uploader.destroy(book.coverImagePublicId);
    }

    if (book.bookPDFPublicId) {
      await cloudinary.uploader.destroy(book.bookPDFPublicId);
    }

    const deletedBook = await deleteOne(id);
    res.status(200).json({
      message: "deleted successfully",
      data: formatMongoData(deletedBook),
    });
  } catch (error) {
    next(error);
  }
};

// uppdate book
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const book = await getOne(id);

    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    const files = req.files as {
      coverImage?: Express.Multer.File[];
      bookPDF?: Express.Multer.File[];
    };

    const updatedFields: any = { ...req.body };

    if (files?.coverImage?.[0]?.path) {
      if (book.coverImagePublicId) {
        await cloudinary.uploader.destroy(book.coverImagePublicId);
      }
      updatedFields.coverImage = files.coverImage[0].path;
      updatedFields.coverImagePublicId = files.coverImage[0].filename;
    }

    if (files?.bookPDF?.[0]?.path) {
      if (book.bookPDFPublicId) {
        await cloudinary.uploader.destroy(book.bookPDFPublicId, {
          resource_type: "raw",
        });
      }
      updatedFields.bookPDF = files.bookPDF[0].path;
      updatedFields.bookPDFPublicId = files.bookPDF[0].filename;
    }

    const updatedBook = await update(id, updatedFields);

    res.status(200).json({
      message: "Updated successfully",
      data: formatMongoData(updatedBook),
    });
  } catch (error) {
    next(error);
  }
};
