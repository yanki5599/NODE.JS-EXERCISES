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
const SALT_ROUNDS = 10;
export const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send("username and password required");
    }
    try {
        if (yield isUsernameExist(req.body.username)) {
            return res.status(400).send("username already taken");
        }
        const user = yield createUser(req.body.username, req.body.password);
        res.status(201).send({ userid: user.id });
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    if (!user.username || !user.password) {
        return res.status(400).send({ message: "username and password required" });
    }
    try {
        if (!(yield isUsernameExist(req.body.username))) {
            return res.status(400).send("username does not exist");
        }
        const found = yield loginUser(user.username, user.password);
        if (found) {
            res.status(200).send({ userid: found.id });
        }
        else {
            res.status(400).send("username and password do not match");
        }
    }
    catch (err) {
        res.sendStatus(500);
    }
});
