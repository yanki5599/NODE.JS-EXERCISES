const express = require("express");
const users = require("./users.js");
const bcrypt = require("bcrypt");

const router = express.Router();
const app = express();

app.use(express.json());

// login
router.post("/", (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("Email and password are required");
  }
  const user = users.find(
    (user) =>
      user.email === req.body.email &&
      bcrypt.compareSync(req.body.password, user.password)
  );
  if (!user) {
    res.status(401).send("wrong credentials");
  } else {
    res.status(200).send("User is connected");
  }
});

module.exports = router;
