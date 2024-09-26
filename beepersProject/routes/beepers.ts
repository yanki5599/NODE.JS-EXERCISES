import express, { Router } from "express";
import {
  getBeepers,
  addBeeper,
  updateBeeper,
  deleteBeeper,
  getBeeper,
  getBeepersByStatus,
} from "../controllers/beeperController.js";

const router: Router = express.Router();

router.route("/").get(getBeepers).post(addBeeper);

router.route("/:id").get(getBeeper).delete(deleteBeeper);

router.route("/:id/status").put(getBeeper);

router.route("/status/:status").get(getBeepersByStatus);

export default router;
