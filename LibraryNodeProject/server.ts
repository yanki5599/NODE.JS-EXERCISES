import express, { Application } from "express";
import authRouter from "./routes/auth.js";
import bookRouter from "./routes/books.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import cors from "cors";

dotenv.config();
const app: Application = express();

const PORT: number | string = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// login and register
app.use("/", authRouter);

// check if the token is valid for next routes
app.use(authMiddleware);

// api for books
app.use("/books", bookRouter);

// error middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
