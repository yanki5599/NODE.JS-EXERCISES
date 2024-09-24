import fs from "fs";
export const FILE_PATH = "./DAL/usersData.json";

export async function ensureDataExists() {
  if (!fs.existsSync(FILE_PATH)) {
    await jsonfile.writeFile(FILE_PATH, []);
  }
}
