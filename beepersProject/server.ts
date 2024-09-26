import express, { Application } from "express";
import beepersRouter from "./routes/beepers.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import cors from "cors";

dotenv.config();
const app: Application = express();

const PORT: number | string = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// api for beepers
app.use("/api/beepers", beepersRouter);

// error middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
