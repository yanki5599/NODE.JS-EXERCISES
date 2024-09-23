const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

// use routes
app.use("/users", require("./routes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
