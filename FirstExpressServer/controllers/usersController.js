import { isValidEmail, isValidPassword } from "../utils.js";

import usersService from "../services/usersService.js";

export const getAllUsers = async (req, res) => {
  res.send(await usersService.getAllUsers());
};

export const getUserById = async (req, res) => {
  const user = await usersService.getUserById(req.params.id);
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

  if (await usersService.isExistEmail(req.body.email)) {
    return res.status(400).send("Email already exist");
  }
  if (!isValidEmail(req.body.email)) {
    return res.status(400).send("Email is not valid");
  }
  if (!isValidPassword(req.body.password)) {
    return res.status(400).send("Password is not valid");
  }

  try {
    const user = await usersService.createUser({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).send(user);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

export const updateUser = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("Email and password are required");
  }
  if (req.body.id !== req.params.id) {
    return res.status(400).send("ID does not match");
  }

  try {
    const user = req.body;
    await usersService.updateUser(req.params.id, user);
  } catch (err) {
    return res.status(400).send(err.message);
  }

  res.status(204).send();
};

export const deleteUser = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("ID is required");
  }
  if (!usersService.isUserExist(req.params.id)) {
    res.status(404).send("User not found");
  }

  try {
    await usersService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).send(err.message);
  }
};
