var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import * as userService from "../services/userService.js";
export const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token; // Extract token from cookies
    if (!token) {
        res.status(401).send({ message: "Unauthorized, missing token" });
        return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const passportId = decoded.passportId;
    if (!passportId) {
        res.status(401).send({ message: "Unauthorized" });
    }
    try {
        const user = yield userService.getUserByPassportId(passportId);
        req.user = user;
    }
    catch (err) {
        console.log(err);
        res.status(401).send({ message: "Unauthorized" });
    }
    next();
});
