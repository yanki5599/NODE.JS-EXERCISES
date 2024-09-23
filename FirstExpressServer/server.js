import express from "express";

import loginRouter from "./routes/loginRouter.js";
import usersRouter from "./routes/usersRouter.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

// use routes
// crud router
app.use("/users", usersRouter);

// login
app.use("/login", loginRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
