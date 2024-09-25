import { writeUser, readUsers, rewriteUsers } from "../DAL/jsonUsers.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { User, UserNamePassword } from "../models/types.js";
const SALT_ROUNDS = 10;

export const createUser = async (userNamePassword: UserNamePassword) => {
  const user: User = {
    username: userNamePassword.username,
    password: bcrypt.hashSync(userNamePassword.password, SALT_ROUNDS),
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

export const isUserIdExist = async (userid: string) => {
  const users: User[] = await readUsers();
  return users.some((user: User) => user.id === userid);
};

export const getUserById = async (
  userid: string
): Promise<User | undefined> => {
  const users: User[] = await readUsers();
  return users.find((user: User) => user.id === userid);
};

export const updateUser = async (userid: string, user: User) => {
  const users: User[] = await readUsers();
  const index = users.findIndex((u) => u.id === userid);
  if (index === -1) {
    throw new Error("User not found");
  }
  users[index] = user;
  await rewriteUsers(users);
};
