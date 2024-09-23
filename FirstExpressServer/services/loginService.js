import { FILE_PATH as filePath } from "./config.js";
import bcrypt from "bcrypt";

function login(email, passwordStr) {
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
