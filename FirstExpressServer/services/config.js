import fs from "fs";
export const FILE_PATH = "./DAL/usersData.json";

export function ensureDataExists() {
  if (!fs.existsSync(FILE_PATH)) {
    jsonfile.writeFileSync(FILE_PATH, []);
  }
}
