import { deleteOne, getAll, getOne, post, update, } from "../services/bookService.js";
import formatMongoData from "../utils/formatMongoData.js";
import { update as updateAuthor, getOne as getAuthor, } from "../services/authorService.js";
// get all books
export const getBooks = async (_, res, next) => {
    try {
        const books = await getAll();
        const formattedBooks = books.map((book) => {
            const bookObj = book.toObject();
            const formattedAuthor = typeof bookObj.author === "object"
                ? formatMongoData(bookObj.author)
                : bookObj.author;
            return {
                ...formatMongoData(bookObj),
                author: formattedAuthor,
            };
        });
        res.status(200).json(formattedBooks);
    }
    catch (error) {
        next(error);
    }
};
// get one book
export const getBookById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const book = await getOne(id);
        if (!book)
            throw new Error("book is not found");
        const bookObj = book.toObject();
        const formattedAuthor = formatMongoData(bookObj.author);
        const formattedBook = {
            ...formatMongoData(bookObj),
            author: formattedAuthor,
        };
        res.status(200).json(formattedBook);
    }
    catch (error) {
        next(error);
    }
};
// post book
export const postBook = async (req, res, next) => {
    try {
        const newBook = await post(req.body);
        const author = await getAuthor(req.body.author);
        if (!author)
            throw new Error("author not found");
        await updateAuthor(req.body.author, {
            books: [...author.books, newBook.id],
        });
        res.status(201).json(formatMongoData(newBook));
    }
    catch (error) {
        next(error);
    }
};
// delete book
export const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedBook = await deleteOne(id);
        if (!deletedBook)
            throw new Error("book is not found");
        res.status(200).json(formatMongoData(deletedBook));
    }
    catch (error) {
        next(error);
    }
};
// uppdate book
export const updateBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedBook = { ...req.body };
        const updateBookResponse = await update(id, updatedBook);
        res.status(200).json(formatMongoData(updateBookResponse));
    }
    catch (error) {
        next(error);
    }
};
