import bcrypt from "bcrypt";
import users from "../DAL/users.js";
import {
  generateId,
  isExistEmail,
  isValidEmail,
  isValidPassword,
} from "../utils.js";

import usersService from "../services/usersService.js";

export const getAllUsers = async (req, res) => {
  res.send(usersService.getAllUsers());
};

export const getUserById = async (req, res) => {
  const user = usersService.getUserById(req.params.id);
  if (!user) {
    res.status(404).send("User not found");
  } else {
    res.status(200).send(user);
  }
};

export const createUser = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("Email and password are required");
  }

  if (isExistEmail(req.body.email)) {
    return res.status(400).send("Email already exist");
  }
  if (!isValidEmail(req.body.email)) {
    return res.status(400).send("Email is not valid");
  }
  if (!isValidPassword(req.body.password)) {
    return res.status(400).send("Password is not valid");
  }

  usersService.createUser(({ email, password } = req.body));
  res.status(201).send(user);
};

export const updateUser = async (req, res) => {
  if (req.body.id !== req.params.id) {
    return res.status(400).send("ID does not match");
  }
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("Email and password are required");
  }

  const user = users.find((user) => user.id === req.params.id);
  if (!user) {
    return res.status(404).send("User not found");
  }
  user.email = req.body.email;
  user.password = req.body.password;
  res.status(204).send();
};

export const deleteUser = async (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  if (!user) {
    res.status(404).send("User not found");
  } else {
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.status(204).send();
  }
};
