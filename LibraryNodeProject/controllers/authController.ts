import { NextFunction, Request, Response } from "express";
import { User, UserNamePassword } from "../models/types.js";
import {
  createUser,
  isUsernameExist,
  loginUser,
} from "../services/usersService.js";
import {
  ErrorWithStatusCode,
  UserAlreadyExists,
  UserNotFoundError,
} from "../ErrorsModels/errorTypes.js";

const SALT_ROUNDS = 10;
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userNamePassword: UserNamePassword = {
    username: req.body.username.toString(),
    password: req.body.password.toString(),
  };
  try {
    if (!userNamePassword.username || !userNamePassword.password) {
      throw new ErrorWithStatusCode("username and password required", 400);
    }

    if (await isUsernameExist(userNamePassword.username)) {
      throw new UserAlreadyExists("username already taken");
    }

    const user: User = await createUser(userNamePassword);
    res.status(201).send({ userid: user.id });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body;

    if (!user.username || !user.password) {
      throw new ErrorWithStatusCode("username and password required", 400);
    }
    if (!(await isUsernameExist(user.username))) {
      throw new UserNotFoundError("invalid username or password");
    }

    const found = await loginUser(user.username, user.password);
    if (found) {
      res.status(200).send({ userid: found.id });
    } else {
      throw new ErrorWithStatusCode("username and password do not match", 400);
    }
  } catch (err: any) {
    next(err);
  }
};
