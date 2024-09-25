import { Request, Response, NextFunction } from "express";
import {
  ErrorWithStatusCode,
  MissingToken,
} from "../ErrorsModels/errorTypes.js";
import { Book } from "../models/types.js";
import bookService from "../services/bookService.js";

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userid = req.query.userid?.toString();
    if (!userid) {
      throw new MissingToken("missing token (userid)");
    }
    const books = await bookService.getUserBooks(userid);
    res.status(200).send({ data: books });
  } catch (err) {
    next(err);
  }
};

export const addBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userid: string = req.body.userid;
    if (!userid) {
      throw new MissingToken("missing token (userid)");
    }
    const bookName = req.body.bookName;
    if (!bookName) {
      throw new ErrorWithStatusCode("book name required", 400);
    }

    const added: Book = await bookService.addBookToUser(userid, bookName);
    res.status(201).send({ bookId: added.id, book: added });
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userid = req.body.userid; // middleware already checked for userid
    const updatedData = req.body.updatedData;
    if (!updatedData) {
      throw new ErrorWithStatusCode("updated data required", 400);
    }
    const bookId: number = parseInt(req.params.bookId);
    console.log("bookId", bookId);

    if (!bookId) {
      throw new ErrorWithStatusCode("book id required", 400);
    }
    await bookService.updateBook(userid, bookId, updatedData);
    res.status(204).send({ message: "book updated successfully" });
  } catch (err) {
    next(err);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userid = req.body.userid; // middleware already checked for userid
    const bookId: number = req.params?.bookId as unknown as number;
    if (!bookId) {
      throw new ErrorWithStatusCode("book id required", 400);
    }
    await bookService.deleteBook(userid, bookId);
    res.status(204).send({ message: "book deleted successfully" });
  } catch (err) {
    next(err);
  }
};
