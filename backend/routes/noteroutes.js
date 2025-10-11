import express from "express";
import Note from "../models/note.js";
import verifyToken  from "../middleware/auth.js";

const router = express.Router();

// Get all notes  associated with the authenticated user
router.get("/", verifyToken, async (req, res) => {
  const notes = await Note.find({ userId: req.userId });
  res.json(notes);
});

// Create note
router.post("/", verifyToken, async (req, res) => {
  const note = new Note({ ...req.body, userId: req.userId });
  await note.save();
  res.json(note);
});

// Update note
router.put("/:id", verifyToken, async (req, res) => {
  const updatedNote = await Note.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  res.json(updatedNote);
});

// Delete note
router.delete("/:id", verifyToken, async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: "Deleted successfully" });
});

export default router;
