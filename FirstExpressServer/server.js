const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

// use routes
// crud router
app.use("/users", require("./routes"));

// login
app.use("/login", require("./login"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
