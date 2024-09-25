import express, { Router } from "express";
import {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

const router: Router = express.Router();

router.route("/").get(getBooks).post(addBook);

router.route("/:bookId").put(updateBook).delete(deleteBook);

export default router;
