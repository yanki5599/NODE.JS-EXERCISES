import { v4 as uuid } from "uuid";
import { Request, Response } from "express";
import { User } from "../models/types.js";
import bcrypt from "bcrypt";
import {
  createUser,
  isUsernameExist,
  loginUser,
} from "../services/usersService.js";

const SALT_ROUNDS = 10;
export const register = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send("username and password required");
  }

  try {
    if (await isUsernameExist(req.body.username)) {
      return res.status(400).send("username already taken");
    }
    const user: User = await createUser(req.body.username, req.body.password);
    res.status(201).send({ userid: user.id });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const login = async (req: Request, res: Response) => {
  const user = req.body;

  if (!user.username || !user.password) {
    return res.status(400).send({ message: "username and password required" });
  }

  try {
    if (!(await isUsernameExist(req.body.username))) {
      return res.status(400).send("username does not exist");
    }
    const found = await loginUser(user.username, user.password);
    if (found) {
      res.status(200).send({ userid: found.id });
    } else {
      res.status(400).send("username and password do not match");
    }
  } catch (err) {
    res.sendStatus(500);
  }
};
