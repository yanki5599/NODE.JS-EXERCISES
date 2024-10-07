import express from "express";
import * as gradesController from "../controllers/gradesController.js";
import { studentMiddleware } from "../middleware/studentMiddleware.js";
const router = express.Router();
router.use(studentMiddleware);
router.route("/avgGrade").get(gradesController.getAverageGrade);
router.route("/grades").get(gradesController.getGrades);
export default router;
