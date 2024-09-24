import { writeUser, readUsers } from "../DAL/jsonUsers.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { User } from "../models/types.js";
const SALT_ROUNDS = 10;

export const createUser = async (username: string, password: string) => {
  const user = {
    username,
    password: bcrypt.hashSync(password, SALT_ROUNDS),
    id: uuid(),
    books: [],
  };
  await writeUser(user);
  return user;
};

export const isUsernameExist = async (username: string) => {
  const users: User[] = await readUsers();
  return users.some((user: User) => user.username === username);
};

export const loginUser = async (username: string, password: string) => {
  const users: User[] = await readUsers();
  const user = users.find((user: User) => user.username === username);
  if (!user) {
    return null;
  }
  if (bcrypt.compareSync(password, user.password)) {
    return user;
  }
  return null;
};
