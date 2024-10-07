import e from "express";
import express from "express";
import * as gradesController from "../controllers/gradesController.js";

const router = express.Router();

router.use();

router.route("/avgGrade").get(gradesController.getAverageGrade);
router.route("/grades").get(gradesController.getGrades);

export default router;
