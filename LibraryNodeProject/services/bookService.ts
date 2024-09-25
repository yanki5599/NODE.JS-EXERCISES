import { writeUser, readUsers } from "../DAL/jsonUsers.js";
import {
  ErrorWithStatusCode,
  UserNotFoundError,
} from "../ErrorsModels/errorTypes.js";
import { User } from "../models/types.js";
import { Book } from "../models/types.js";
import * as userService from "./usersService.js";
import { fetchBookInfo } from "./apiBookService.js";

const getUserBooks = async (userid: string) => {
  const users: User[] = await readUsers();
  const user = users.find((user: User) => user.id === userid);
  if (!user) throw new UserNotFoundError("user not found");
  return user.books;
};

const addBookToUser = async (
  userid: string,
  bookName: string
): Promise<Book> => {
  const user = await userService.getUserById(userid);
  if (!user) throw new UserNotFoundError("user not found");
  const book = await fetchBookInfo(bookName);
  user.books.push(book);
  await userService.updateUser(user.id, user);
  return book;
};

const updateBook = async (
  userId: string,
  bookId: number,
  updatedBook: Book
) => {
  const user: User | undefined = await userService.getUserById(userId);
  if (!user) throw new UserNotFoundError();
  const oldBookIndex = user.books.findIndex((book) => book.id === bookId);
  if (oldBookIndex === -1) throw new ErrorWithStatusCode("book not found", 404);

  // update book
  user.books[oldBookIndex] = updatedBook;
  await userService.updateUser(user.id, user);
};
const deleteBook = async (userId: string, bookId: number) => {
  const user: User | undefined = await userService.getUserById(userId);
  if (!user) throw new UserNotFoundError();
  const targetBookIndex = user.books.findIndex((book) => book.id !== bookId);
  if (targetBookIndex === -1)
    throw new ErrorWithStatusCode("book to delete not found", 400);
  user.books.splice(targetBookIndex, 1);
  await userService.updateUser(user.id, user);
};

export default { getUserBooks, addBookToUser, updateBook, deleteBook };
