import jsonfile from "jsonfile";
import { generateId } from "../utils.js";
import { FILE_PATH as filePath, ensureDataExists } from "./config.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

async function getAllUsers() {
  ensureDataExists();
  return await jsonfile.readFile(filePath);
}

async function getUserById(id) {
  ensureDataExists();
  const users = await jsonfile.readFile(filePath);
  return users.find((user) => user.id === id);
}

async function createUser(user) {
  ensureDataExists();
  if (isUserExist(user.email)) {
    throw new Error("User already exists");
  }
  const users = await jsonfile.readFile(filePath);

  let newId = generateId();
  while (users.find((user) => user.id === newId)) {
    newId = generateId();
  }

  const hash = bcrypt.hashSync(user.password, SALT_ROUNDS);

  user.password = hash;
  user.id = newId;

  users.push(user);
  jsonfile.writeFileSync(filePath, users);
  return user;
}

async function updateUser(id, user) {
  ensureDataExists();
  const users = await jsonfile.readFile(filePath);
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    throw new Error("User not found");
  }
  users[index] = user;
  jsonfile.writeFileSync(filePath, users);
  return user;
}

async function deleteUser(id) {
  ensureDataExists();
  const users = await jsonfile.readFile(filePath);
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    throw new Error("User not found");
  }
  users.splice(index, 1);
  jsonfile.writeFileSync(filePath, users);
}

async function isUserExist(id) {
  ensureDataExists();
  const users = await jsonfile.readFile(filePath);
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
