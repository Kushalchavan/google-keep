import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from "../controller/note.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", verifyJwt, createNote);
router.put("/update/:id", verifyJwt, updateNote);
router.get("/notes", verifyJwt, getAllNotes);
router.delete("/delete/:id", verifyJwt, deleteNote);

export default router;
