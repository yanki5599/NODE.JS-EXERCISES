import { error } from "console";
import { ErrorWithStatusCode } from "../models/errorTypes.js";
import user, { IUser, IGrade } from "../models/user.js";
import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import { get } from "http";

const SALT_ROUNDS = 10;

export const createUser = async (newUser: IUser): Promise<IUser> => {
  if (!newUser.passportId || !newUser.password) {
    throw new ErrorWithStatusCode("passportId and password are required", 400);
  }

  const user = await UserModel.findOne({ passportId: newUser.passportId });
  if (user) {
    throw new ErrorWithStatusCode("User already exists", 409);
  }
  newUser.password = await bcrypt.hash(newUser.password, SALT_ROUNDS);
  try {
    const added = await UserModel.create(newUser);
    return added;
  } catch (error: any) {
    throw new ErrorWithStatusCode(error.message, 400);
  }
};
export const authenticateUser = async (
  passportId: string,
  password: string
): Promise<IUser> => {
  if (!passportId || !password) {
    throw new ErrorWithStatusCode("passportId and password are required", 401);
  }
  const user = await UserModel.findOne({ passportId });
  if (!user) {
    throw new ErrorWithStatusCode("User not found", 401);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new ErrorWithStatusCode("invalid id or password", 401);
  }

  return user;
};
export const getAllUsers = async (): Promise<IUser[]> => {
  return await UserModel.find();
};
export const getUserByPassportId = async (
  passportId: string
): Promise<IUser> => {
  if (!passportId) {
    throw new ErrorWithStatusCode("passportId is required", 400);
  }
  const user = await UserModel.findOne({ passportId });
  if (!user) {
    throw new ErrorWithStatusCode("User not found", 404);
  }
  return user;
};
export function getAverageGrade(wantedUser: IUser): number {
  if (wantedUser.grades.length === 0) {
    return 0;
  }
  return (
    wantedUser.grades.reduce((a: number, b: IGrade) => a + b.grade, 0) /
    wantedUser.grades.length
  );
}

export const addGrade = async (
  passportId: string,
  newGrade: IGrade
): Promise<void> => {
  console.log("passportId:", passportId);

  if (!passportId) {
    throw new ErrorWithStatusCode("passportId is required", 400);
  }
  if (!newGrade) {
    throw new ErrorWithStatusCode("grade is required", 400);
  }

  const wantedUser: IUser | null = await UserModel.findOne({
    passportId: passportId,
  });
  if (!wantedUser) {
    throw new Error("User not found");
  }

  wantedUser.grades.push(newGrade);
  wantedUser.save();
};
export const removeGrade = async (
  passportId: string,
  gradeSubject: string
): Promise<void> => {
  if (!passportId) {
    throw new ErrorWithStatusCode("passportId is required", 400);
  }
  if (!gradeSubject) {
    throw new ErrorWithStatusCode("gradeSubject is required", 400);
  }
  const wantedUser: IUser = await getUserByPassportId(passportId);

  wantedUser.grades = wantedUser.grades.filter(
    (g) => g.subject !== gradeSubject
  );
  wantedUser.save();
};

export const updateGrade = async (
  passportId: string,
  newGrade: IGrade
): Promise<void> => {
  if (!passportId) {
    throw new ErrorWithStatusCode("passportId is required", 400);
  }
  const user = await getUserByPassportId(passportId);
  user.grades = user.grades.filter((g) => g.subject !== newGrade.subject);
  user.grades.push(newGrade);
  user.save();
};
