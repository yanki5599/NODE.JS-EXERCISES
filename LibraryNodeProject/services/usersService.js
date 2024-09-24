var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { writeUser, readUsers } from "../DAL/jsonUsers.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
const SALT_ROUNDS = 10;
export const createUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        username,
        password: bcrypt.hashSync(password, SALT_ROUNDS),
        id: uuid(),
        books: [],
    };
    yield writeUser(user);
    return user;
});
export const isUsernameExist = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield readUsers();
    return users.some((user) => user.username === username);
});
export const loginUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield readUsers();
    const user = users.find((user) => user.username === username);
    if (!user) {
        return null;
    }
    if (bcrypt.compareSync(password, user.password)) {
        return user;
    }
    return null;
});
