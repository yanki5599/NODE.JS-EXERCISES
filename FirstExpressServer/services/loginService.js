import { FILE_PATH as filePath, ensureDataExists } from "./config.js";
import bcrypt from "bcrypt";
import jsonfile from "jsonfile";

function login(email, passwordStr) {
  ensureDataExists();

  const users = jsonfile.readFileSync(filePath);
  const user = users.find(
    (u) => u.email === email && bcrypt.compareSync(passwordStr, u.password)
  );
  if (!user) {
    throw new Error("Invalid email or password");
  }
  return user;
}

export default { login };
