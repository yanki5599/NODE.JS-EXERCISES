import express, { Application } from "express";

import dotenv from "dotenv";
import { errorMiddleware } from "./middleware/errorHandler.js";
import authRouter from "./routes/authRouter.js";
import studentRouter from "./routes/studentRouter.js";
import teacherRouter from "./routes/teacherRouter.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 5000;

app.use("/", authRouter);

app.use(authMiddleware);

app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
