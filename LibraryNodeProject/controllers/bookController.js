var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ErrorWithStatusCode, MissingToken, } from "../ErrorsModels/errorTypes.js";
import bookService from "../services/bookService.js";
export const getBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userid = (_a = req.query.userid) === null || _a === void 0 ? void 0 : _a.toString();
        if (!userid) {
            throw new MissingToken("missing token (userid)");
        }
        const books = yield bookService.getUserBooks(userid);
        res.status(200).send({ data: books });
    }
    catch (err) {
        next(err);
    }
});
export const addBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userid = req.body.userid;
        if (!userid) {
            throw new MissingToken("missing token (userid)");
        }
        const bookName = req.body.bookName;
        if (!bookName) {
            throw new ErrorWithStatusCode("book name required", 400);
        }
        const added = yield bookService.addBookToUser(userid, bookName);
        res.status(201).send({ bookId: added.id, book: added });
    }
    catch (err) {
        next(err);
    }
});
export const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userid = req.body.userid; // middleware already checked for userid
        const updatedData = req.body.updatedData;
        if (!updatedData) {
            throw new ErrorWithStatusCode("updated data required", 400);
        }
        const bookId = parseInt(req.params.bookId);
        console.log("bookId", bookId);
        if (!bookId) {
            throw new ErrorWithStatusCode("book id required", 400);
        }
        yield bookService.updateBook(userid, bookId, updatedData);
        res.status(204).send({ message: "book updated successfully" });
    }
    catch (err) {
        next(err);
    }
});
export const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userid = req.body.userid; // middleware already checked for userid
        const bookId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.bookId;
        if (!bookId) {
            throw new ErrorWithStatusCode("book id required", 400);
        }
        yield bookService.deleteBook(userid, bookId);
        res.status(204).send({ message: "book deleted successfully" });
    }
    catch (err) {
        next(err);
    }
});
