import express from "express";
import login from "../controllers/loginController.js";

const router = express.Router();

// login
router.post("/", login);

export default router;
