var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import asyncHandler from "../middleware/asyncHandler.js";
import jwt from "jsonwebtoken";
import * as userService from "../services/userService.js";
import { ErrorWithStatusCode } from "../models/errorTypes.js";
export const login = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { passportId, password } = req.body;
    const user = yield userService.authenticateUser(passportId, password);
    if (!user) {
        throw new ErrorWithStatusCode("User not found", 404);
    }
    const token = jwt.sign({ passportId: user.passportId }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000,
    });
    res.status(200).json({ message: "User logged in successfully" });
}));
export const register = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    const added = yield userService.createUser(newUser);
    res.status(201).json({ message: "User created successfully" });
}));
