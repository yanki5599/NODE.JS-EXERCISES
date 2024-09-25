import express from "express";
import { getBooks, addBook, updateBook, deleteBook, } from "../controllers/bookController.js";
const router = express.Router();
router.route("/").get(getBooks).post(addBook);
router.route("/:bookId").put(updateBook).delete(deleteBook);
export default router;
