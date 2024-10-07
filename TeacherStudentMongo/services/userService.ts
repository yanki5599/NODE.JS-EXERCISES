import { ErrorWithStatusCode } from "../models/errorTypes.js";
import user, { IUser } from "../models/user.js";
import UserModel from "../models/user.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const createUser = async (newUser: IUser): Promise<IUser> => {
  newUser.password = await bcrypt.hash(newUser.password, SALT_ROUNDS);
  const added = await UserModel.create(newUser);
  return added;
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
export const getUserById = async (passportId: string): Promise<IUser> => {
  const user = await UserModel.findOne({ passportId });
  if (!user) {
    throw new ErrorWithStatusCode("User not found", 404);
  }
  return user;
};
