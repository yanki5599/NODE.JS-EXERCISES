import express from "express";
import { getBooks, addBook, updateBook, deleteBook, } from "../controllers/bookController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();
router.route("/").get(getBooks).post(addBook, authMiddleware);
router.use(authMiddleware);
router.route("/:bookId").put(updateBook).delete(deleteBook);
export default router;
