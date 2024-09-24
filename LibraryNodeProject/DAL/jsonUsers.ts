import jsonfile from "jsonfile";
import { User } from "../models/types.js";
import fs from "fs";

function ensureJsonFileExists() {
  if (!fs.existsSync("./data/db.json")) {
    jsonfile.writeFileSync("./data/db.json", []);
  }
}
export const writeUser = async (user: User) => {
  ensureJsonFileExists();
  const users = await readUsers();
  users.push(user);
  await jsonfile.writeFile("./data/db.json", users);
};

export const readUsers = async () => {
  ensureJsonFileExists();
  const users = await jsonfile.readFile("./data/db.json");
  return users;
};
