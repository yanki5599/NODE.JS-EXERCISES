var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readUsers } from "../DAL/jsonUsers.js";
import { ErrorWithStatusCode, UserNotFoundError, } from "../ErrorsModels/errorTypes.js";
import * as userService from "./usersService.js";
import { fetchBookInfo } from "./apiBookService.js";
const getUserBooks = (userid) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield readUsers();
    const user = users.find((user) => user.id === userid);
    if (!user)
        throw new UserNotFoundError("user not found");
    return user.books;
});
const addBookToUser = (userid, bookName) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService.getUserById(userid);
    if (!user)
        throw new UserNotFoundError("user not found");
    const book = yield fetchBookInfo(bookName);
    user.books.push(book);
    yield userService.updateUser(user.id, user);
    return book;
});
const updateBook = (userId, bookId, updatedBook) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService.getUserById(userId);
    if (!user)
        throw new UserNotFoundError();
    const oldBookIndex = user.books.findIndex((book) => book.id === bookId);
    if (oldBookIndex === -1)
        throw new ErrorWithStatusCode("book not found", 404);
    // update book
    user.books[oldBookIndex] = updatedBook;
    yield userService.updateUser(user.id, user);
});
const deleteBook = (userId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService.getUserById(userId);
    if (!user)
        throw new UserNotFoundError();
    const targetBookIndex = user.books.findIndex((book) => book.id !== bookId);
    if (targetBookIndex === -1)
        throw new ErrorWithStatusCode("book to delete not found", 400);
    user.books.splice(targetBookIndex, 1);
    yield userService.updateUser(user.id, user);
});
export default { getUserBooks, addBookToUser, updateBook, deleteBook };
