import jsonfile from "jsonfile";
import { User } from "../models/types.js";
import dotenv from "dotenv";
dotenv.config();
const DB_PATH: string = process.env.DB_PATH || "./data/db.json";

import fs from "fs";

function ensureJsonFileExists() {
  if (!fs.existsSync(DB_PATH)) {
    jsonfile.writeFileSync(DB_PATH, []);
  }
}
export const writeUser = async (user: User): Promise<void> => {
  ensureJsonFileExists();
  const users = await readUsers();
  users.push(user);
  await jsonfile.writeFile(DB_PATH, users);
};

export const readUsers = async (): Promise<User[]> => {
  ensureJsonFileExists();
  const users = await jsonfile.readFile(DB_PATH);
  return users;
};

export const rewriteUsers = async (users: User[]): Promise<void> => {
  ensureJsonFileExists();
  await jsonfile.writeFile(DB_PATH, users);
};
