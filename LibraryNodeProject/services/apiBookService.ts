import dotenv from "dotenv";
import { Book } from "../models/types.js";
import axios from "axios";
import { ErrorWithStatusCode } from "../ErrorsModels/errorTypes.js";
dotenv.config();

const API_URL: string | undefined = process.env.API_URL;
export const fetchBookInfo = async (bookTitleName: string): Promise<Book> => {
  const response = await axios.get(`${API_URL}?search=${bookTitleName}`);
  const book = await response.data[0];
  if (!book) throw new ErrorWithStatusCode("Book not found", 404);
  return book;
};

export const fetchAllBooksNames = async (): Promise<string[]> => {
  const response = await axios.get(`${API_URL}`);
  const books: Book[] = await response.data;
  return books.map((book: Book) => book.title);
};
