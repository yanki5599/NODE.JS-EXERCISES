const express = require("express");
const users = require("./users.js");
const { generateId, isExistEmail } = require("./utils.js");
const bcrypt = require("bcrypt");

const router = express.Router();
const app = express();

app.use(express.json());

// get all users
router.get("/", (req, res) => {
  res.send(users);
});

// get user by id
router.get("/:id", (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  if (!user) {
    res.status(404).send("User not found");
  } else {
    res.status(200).send(user);
  }
});

// create user
router.post("/", (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("Email and password are required");
  }

  if (isExistEmail(req.body.email)) {
    return res.status(400).send("Email already exist");
  }

  let newId = generateId();
  while (users.find((user) => user.id === newId)) {
    newId = generateId();
  }

  const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());

  const user = {
    id: newId,
    email: req.body.email,
    password: hash,
  };

  users.push(user);
  res.status(201).send(user);
});

// update user
router.put("/:id", (req, res) => {
  if (req.body.id !== req.params.id) {
    return res.status(400).send("ID does not match");
  }
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("Email and password are required");
  }

  const user = users.find((user) => user.id === req.params.id);
  if (!user) {
    return res.status(404).send("User not found");
  }
  user.email = req.body.email;
  user.password = req.body.password;
  res.status(204).send();
});

// delete user
router.delete("/:id", (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  if (!user) {
    res.status(404).send("User not found");
  } else {
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.status(204).send();
  }
});

// check if user exist
router.post("/exist", (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("Email and password are required");
  }
  const user = users.find(
    (user) =>
      user.email === req.body.email &&
      bcrypt.compareSync(req.body.password, user.password)
  );
  if (!user) {
    res.status(404).send("wrong credentials");
  } else {
    res.status(200).send("User is connected");
  }
});

module.exports = router;
