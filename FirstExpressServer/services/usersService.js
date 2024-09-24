import { readUsers, writeUsers } from "../DAL/jsonDAL.js";
import { generateId } from "../utils.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

async function getAllUsers() {
  return await readUsers();
}

async function getUserById(id) {
  const users = await readUsers();
  return users.find((user) => user.id === id);
}

async function createUser(user) {
  if (await isExistEmail(user.email)) {
    throw new Error("User already exists");
  }
  const users = await readUsers();

  let newId = generateId();
  while (users.find((user) => user.id === newId)) {
    newId = generateId();
  }

  const hash = bcrypt.hashSync(user.password, SALT_ROUNDS);

  user.password = hash;
  user.id = newId;

  users.push(user);
  writeUsers(users);
  return user;
}

async function updateUser(id, user) {
  ensureDataExists();
  const users = await readUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    throw new Error("User not found");
  }
  users[index] = user;
  writeUsers(users);
  return user;
}

async function deleteUser(id) {
  const users = await readUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    throw new Error("User not found");
  }
  users.splice(index, 1);
  writeUsers(users);
}

// async function isUserExist(id) {
//   const users = await readUsers();
//   return users.some((user) => user.id === id);
// }

async function isExistEmail(email) {
  const users = await readUsers();
  const user = users.find((u) => u.email === email);
  return user;
}

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  // isUserExist,
  isExistEmail,
};
