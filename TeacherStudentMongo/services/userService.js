var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ErrorWithStatusCode } from "../models/errorTypes.js";
import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;
export const createUser = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    if (!newUser.passportId || !newUser.password) {
        throw new ErrorWithStatusCode("passportId and password are required", 400);
    }
    const user = yield UserModel.findOne({ passportId: newUser.passportId });
    if (user) {
        throw new ErrorWithStatusCode("User already exists", 409);
    }
    newUser.password = yield bcrypt.hash(newUser.password, SALT_ROUNDS);
    try {
        const added = yield UserModel.create(newUser);
        return added;
    }
    catch (error) {
        throw new ErrorWithStatusCode(error.message, 400);
    }
});
export const authenticateUser = (passportId, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!passportId || !password) {
        throw new ErrorWithStatusCode("passportId and password are required", 401);
    }
    const user = yield UserModel.findOne({ passportId });
    if (!user) {
        throw new ErrorWithStatusCode("User not found", 401);
    }
    if (!(yield bcrypt.compare(password, user.password))) {
        throw new ErrorWithStatusCode("invalid id or password", 401);
    }
    return user;
});
export const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield UserModel.find();
});
export const getUserByPassportId = (passportId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!passportId) {
        throw new ErrorWithStatusCode("passportId is required", 400);
    }
    const user = yield UserModel.findOne({ passportId });
    if (!user) {
        throw new ErrorWithStatusCode("User not found", 404);
    }
    return user;
});
export function getAverageGrade(wantedUser) {
    if (wantedUser.grades.length === 0) {
        return 0;
    }
    return (wantedUser.grades.reduce((a, b) => a + b.grade, 0) /
        wantedUser.grades.length);
}
export const addGrade = (passportId, newGrade) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("passportId:", passportId);
    if (!passportId) {
        throw new ErrorWithStatusCode("passportId is required", 400);
    }
    if (!newGrade) {
        throw new ErrorWithStatusCode("grade is required", 400);
    }
    const wantedUser = yield UserModel.findOne({
        passportId: passportId,
    });
    if (!wantedUser) {
        throw new Error("User not found");
    }
    wantedUser.grades.push(newGrade);
    wantedUser.save();
});
export const removeGrade = (passportId, gradeSubject) => __awaiter(void 0, void 0, void 0, function* () {
    if (!passportId) {
        throw new ErrorWithStatusCode("passportId is required", 400);
    }
    if (!gradeSubject) {
        throw new ErrorWithStatusCode("gradeSubject is required", 400);
    }
    const wantedUser = yield getUserByPassportId(passportId);
    wantedUser.grades = wantedUser.grades.filter((g) => g.subject !== gradeSubject);
    wantedUser.save();
});
export const updateGrade = (passportId, newGrade) => __awaiter(void 0, void 0, void 0, function* () {
    if (!passportId) {
        throw new ErrorWithStatusCode("passportId is required", 400);
    }
    const user = yield getUserByPassportId(passportId);
    user.grades = user.grades.filter((g) => g.subject !== newGrade.subject);
    user.grades.push(newGrade);
    user.save();
});
