import express from "express";
import * as authController from "../controllers/authController.js";
const router = express.Router();
/**
 * @swagger
 * /login:
 *   get:
 *     description: Login
 *     responses:
 *       200:
 *         description: Login
 *
 *
 */
router.route("/login").post(authController.login);
/**
 * @swagger
 * /register:
 *   post:
 *     description: Register
 *     responses:
 *       201:
 *
 *
 */
router.route("/register").post(authController.register);
export default router;
