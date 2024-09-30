var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isUserIdExist } from "../services/usersService.js";
import { ErrorWithStatusCode, MissingToken, } from "../ErrorsModels/errorTypes.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token)
            throw new MissingToken();
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const { userid } = decoded;
        req.userid = userid;
        // check if the userid is in the database
        if (!(yield isUserIdExist(userid))) {
            throw new ErrorWithStatusCode("missing userId", 400);
        }
    }
    catch (err) {
        next(err);
    }
    next();
});
