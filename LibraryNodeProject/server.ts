import express, { Application } from "express";
import authRouter from "./routes/auth.js";
const app: Application = express();

const PORT = 3000;

app.use(express.json());

app.use("/", authRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
