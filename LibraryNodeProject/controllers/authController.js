var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createUser, isUsernameExist, loginUser, } from "../services/usersService.js";
import { ErrorWithStatusCode, UserAlreadyExists, UserNotFoundError, } from "../ErrorsModels/errorTypes.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const SALT_ROUNDS = 10;
export const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userNamePassword = {
        username: req.body.username.toString(),
        password: req.body.password.toString(),
    };
    try {
        if (!userNamePassword.username || !userNamePassword.password) {
            throw new ErrorWithStatusCode("username and password required", 400);
        }
        if (yield isUsernameExist(userNamePassword.username)) {
            throw new UserAlreadyExists("username already taken");
        }
        const user = yield createUser(userNamePassword);
        res.status(201).send({ userid: user.id });
    }
    catch (err) {
        next(err);
    }
});
export const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        if (!user.username || !user.password) {
            throw new ErrorWithStatusCode("username and password required", 400);
        }
        if (!(yield isUsernameExist(user.username))) {
            throw new UserNotFoundError("invalid username or password");
        }
        const found = yield loginUser(user.username, user.password);
        if (found) {
            const token = jwt.sign({ userid: found.id }, process.env.JWT_KEY, { expiresIn: "2h" });
            res.status(200).send({ token });
        }
        else {
            throw new ErrorWithStatusCode("username and password do not match", 400);
        }
    }
    catch (err) {
        next(err);
    }
});
