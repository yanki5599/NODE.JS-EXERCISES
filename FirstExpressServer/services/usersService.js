import jsonfile from "jsonfile";
import { generateId } from "../utils.js";
import { FILE_PATH as filePath, ensureDataExists } from "./config.js";
import bcrypt from "bcrypt";

function getAllUsers() {
  ensureDataExists();
  return jsonfile.readFileSync(filePath);
}

function getUserById(id) {
  ensureDataExists();
  const users = jsonfile.readFileSync(filePath);
  return users.find((user) => user.id === id);
}

function createUser(user) {
  ensureDataExists();
  if (isUserExist(user.email)) {
    throw new Error("User already exists");
  }
  const users = jsonfile.readFileSync(filePath);

  let newId = generateId();
  while (users.find((user) => user.id === newId)) {
    newId = generateId();
  }

  const hash = bcrypt.hashSync(user.password, bcrypt.genSaltSync());

  user.password = hash;
  user.id = newId;

  users.push(user);
  jsonfile.writeFileSync(filePath, users);
  return user;
}

function updateUser(id, user) {
  ensureDataExists();
  const users = jsonfile.readFileSync(filePath);
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    throw new Error("User not found");
  }
  users[index] = user;
  jsonfile.writeFileSync(filePath, users);
  return user;
}

function deleteUser(id) {
  ensureDataExists();
  const users = jsonfile.readFileSync(filePath);
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    throw new Error("User not found");
  }
  users.splice(index, 1);
  jsonfile.writeFileSync(filePath, users);
}

function isUserExist(id) {
  ensureDataExists();
  const users = jsonfile.readFileSync(filePath);
  return users.some((user) => user.id === id);
}

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  isUserExist,
};
