import jsonfile from "jsonfile";

import { FILE_PATH as filePath } from "./config.js";

function ensureDataExists() {
  if (!jsonfile.existsSync(filePath)) {
    jsonfile.writeFileSync(filePath, []);
  }
}

export function getAllUsers() {
  ensureDataExists();
  return jsonfile.readFileSync(filePath);
}

export function getUserById(id) {
  ensureDataExists();
  const users = jsonfile.readFileSync(filePath);
  return users.find((user) => user.id === id);
}

export function createUser(user) {
  ensureDataExists();
  if (isUserExist(user.email)) {
    throw new Error("User already exists");
  }
  const users = jsonfile.readFileSync(filePath);

  let newId = generateId();
  while (users.find((user) => user.id === newId)) {
    newId = generateId();
  }

  const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());

  user.password = hash;
  user.id = newId;

  users.push(user);
  jsonfile.writeFileSync(filePath, users);
  return user;
}

export function updateUser(id, user) {
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

export function deleteUser(id) {
  ensureDataExists();
  const users = jsonfile.readFileSync(filePath);
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    throw new Error("User not found");
  }
  users.splice(index, 1);
  jsonfile.writeFileSync(filePath, users);
}

export function isUserExist(email) {
  ensureDataExists();
  const users = jsonfile.readFileSync(filePath);
  return users.some((user) => user.email === email);
}
