const users = require("./users");
const { v4: uuidv4 } = require("uuid");
function generateId() {
  return uuidv4();
}

function isExistEmail(email) {
  return !!users.find((u) => u.email === email);
}

module.exports = { generateId, isExistEmail };
