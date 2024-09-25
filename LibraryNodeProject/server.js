import express from "express";
import authRouter from "./routes/auth.js";
import bookRouter from "./routes/books.js";
import { authenticateId } from "./middleware/authMiddleware.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// login and register
app.use("/", authRouter);
// check if the token is valid for next routes
app.use(authenticateId);
// api for books
app.use("/books", bookRouter);
// error middleware
app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
