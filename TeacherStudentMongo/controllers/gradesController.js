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
import { Role } from "../models/role.js";
import * as userService from "../services/userService.js";
// of id ,  for both /student and /teacher/:id
export const getGrades = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const wantedUser = req.user.role === Role.STUDENT
        ? req.user
        : yield userService.getUserByPassportId(req.params.id);
    const grades = wantedUser.grades;
    res.status(200).json({ success: true, data: grades });
}));
export const addGrade = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newGrade = req.body;
    yield userService.addGrade(req.params.id, newGrade);
    res.status(200).json({ success: true });
}));
export const removeGrade = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield userService.removeGrade(req.params.id, req.params.gradeSubject);
    res.status(200).json({ success: true });
}));
export const updateGrade = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newGrade = req.body;
    yield userService.updateGrade(req.params.id, newGrade);
    res.status(200).json({ success: true });
}));
// of id , for both /student and /teachers/:id
export const getAverageGrade = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const wantedUser = req.user.role === Role.STUDENT
        ? req.user
        : yield userService.getUserByPassportId(req.params.id);
    // calculate avg of all grades of wanted user
    const avgGrade = yield userService.getAverageGrade(wantedUser);
    res.status(200).json({ success: true, data: avgGrade });
}));
export const getUsersAverage = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () { }));
