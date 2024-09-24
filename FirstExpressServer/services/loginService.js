import bcrypt from "bcrypt";

import { readUsers } from "../DAL/jsonDAL.js";

async function login(email, passwordStr) {
  const users = readUsers();
  const user = users.find(
    (u) => u.email === email && bcrypt.compareSync(passwordStr, u.password)
  );
  if (!user) {
    throw new Error("Invalid email or password");
  }
  return user;
}

export default { login };
