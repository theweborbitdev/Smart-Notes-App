const mongoose = require("mongoose");
const Note = require("../models/Note");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const normalizeNoteInput = (body = {}) => {
  const payload = body && typeof body === "object" ? body : {};

  return {
    title: typeof payload.title === "string" ? payload.title.trim() : "",
    content: typeof payload.content === "string" ? payload.content.trim() : ""
  };
};

const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json({ data: notes });
  } catch (error) {
    next(error);
  }
};

const createNote = async (req, res, next) => {
  try {
    const noteData = normalizeNoteInput(req.body);

    if (!noteData.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const note = await Note.create(noteData);
    res.status(201).json({ data: note });
  } catch (error) {
    next(error);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }

    const noteData = normalizeNoteInput(req.body);

    if (!noteData.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const note = await Note.findByIdAndUpdate(id, noteData, {
      new: true,
      runValidators: true
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ data: note });
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote
};
