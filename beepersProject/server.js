import express from "express";
import beepersRouter from "./routes/beepers.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import cors from "cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// api for beepers
app.use("/beepers", beepersRouter);
// error middleware
app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
