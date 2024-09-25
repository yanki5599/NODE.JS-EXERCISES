import { NextFunction, Request, Response } from "express";
import { isUserIdExist } from "../services/usersService.js";
import {
  ErrorWithStatusCode,
  MissingToken,
} from "../ErrorsModels/errorTypes.js";
export const authenticateId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userid = req.body.userid || req.query.userid;

    if (!userid) {
      throw new MissingToken();
    }
    // check if the userid is in the database
    if (!(await isUserIdExist(userid))) {
      throw new MissingToken("invalid token (userid)");
      return;
    }
  } catch (err) {
    next(err);
  }

  next();
};
