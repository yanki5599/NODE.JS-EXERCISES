import fs from "fs";
export const FILE_PATH = "./Data/usersData.json";
import jsonfile from "jsonfile";

export async function ensureDataExists() {
  if (!fs.existsSync(FILE_PATH)) {
    await jsonfile.writeFile(FILE_PATH, []);
  }
}

export async function readUsers() {
  ensureDataExists();
  return await jsonfile.readFile(FILE_PATH);
}

export async function writeUsers(users) {
  ensureDataExists();
  await jsonfile.writeFile(FILE_PATH, users);
}
