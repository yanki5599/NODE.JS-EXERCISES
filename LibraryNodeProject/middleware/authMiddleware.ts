import { NextFunction, Request, Response } from "express";
import { isUserIdExist } from "../services/usersService.js";
import {
  ErrorWithStatusCode,
  MissingToken,
} from "../ErrorsModels/errorTypes.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = (req.headers["authorization"] as string)?.split(
      " "
    )[1] as string;
    if (!token) throw new MissingToken();

    const decoded = jwt.verify(token, process.env.JWT_KEY as string);
    const { userid } = decoded as { userid: string };

    (req as any).userid = userid;
    // check if the userid is in the database
    if (!(await isUserIdExist(userid))) {
      throw new ErrorWithStatusCode("missing userId", 400);
    }
  } catch (err) {
    next(err);
  }

  next();
};
