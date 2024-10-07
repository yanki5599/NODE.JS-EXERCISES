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
import * as userService from "../services/userService.js";
export const getAllUsers = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userService.getAllUsers();
    res.status(200).json({ success: true, data: users });
}));
export const getUserById = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService.getUserByPassportId(req.params.id);
    res.status(200).json({ success: true, data: user });
}));
