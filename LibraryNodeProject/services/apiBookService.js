var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dotenv from "dotenv";
import axios from "axios";
import { ErrorWithStatusCode } from "../ErrorsModels/errorTypes.js";
dotenv.config();
const API_URL = process.env.API_URL;
export const fetchBookInfo = (bookTitleName) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios.get(`${API_URL}?search=${bookTitleName}`);
    const book = yield response.data[0];
    if (!book)
        throw new ErrorWithStatusCode("Book not found", 404);
    return book;
});
export const fetchAllBooksNames = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios.get(`${API_URL}`);
    const books = yield response.data;
    return books.map((book) => book.title);
});
