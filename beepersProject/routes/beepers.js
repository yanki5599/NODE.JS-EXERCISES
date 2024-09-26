import express from "express";
import { getBeepers, addBeeper, updateBeeperStatus, deleteBeeper, getBeeperById, getBeepersByStatus, } from "../controllers/beeperController.js";
const router = express.Router();
router.route("/").get(getBeepers).post(addBeeper);
router.route("/:id").get(getBeeperById).delete(deleteBeeper);
router.route("/:id/status").put(updateBeeperStatus);
router.route("/status/:status").get(getBeepersByStatus);
export default router;
