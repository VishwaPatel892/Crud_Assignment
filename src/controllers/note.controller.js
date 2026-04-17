const mongoose = require("mongoose");
const Note = require("../models/note.model");

// ─── Helper ────────────────────────────────────────────────────────────────────
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// ─── 1. POST /api/notes — Create a single note ─────────────────────────────────
const createNote = async (req, res) => {
  try {
    const { title, content, category, isPinned } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
        data: null,
      });
    }

    const note = await Note.create({ title, content, category, isPinned });

    return res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

// ─── 2. POST /api/notes/bulk — Create multiple notes ───────────────────────────
const createBulkNotes = async (req, res) => {
  try {
    const { notes } = req.body;

    if (!notes || !Array.isArray(notes) || notes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "A non-empty 'notes' array is required",
        data: null,
      });
    }

    const created = await Note.insertMany(notes);

    return res.status(201).json({
      success: true,
      message: `${created.length} notes created successfully`,
      data: created,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

// ─── 3. GET /api/notes — Get all notes ─────────────────────────────────────────
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();

    return res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: notes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

// ─── 4. GET /api/notes/:id — Get a single note by ID ───────────────────────────
const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID format",
        data: null,
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note fetched successfully",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

// ─── 5. PUT /api/notes/:id — Replace a note completely ─────────────────────────
const replaceNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID format",
        data: null,
      });
    }

    const { title, content, category, isPinned } = req.body;

    // Build the replacement document — unset fields fall back to schema defaults
    const replacement = {
      title,
      content,
      category: category ?? "personal",
      isPinned: isPinned ?? false,
    };

    const note = await Note.findOneAndReplace(
      { _id: id },
      replacement,
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note replaced successfully",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

// ─── 6. PATCH /api/notes/:id — Update specific fields only ─────────────────────
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID format",
        data: null,
      });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update",
        data: null,
      });
    }

    const note = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

// ─── 7. DELETE /api/notes/:id — Delete a single note ───────────────────────────
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID format",
        data: null,
      });
    }

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

// ─── 8. DELETE /api/notes/bulk — Delete multiple notes by IDs ──────────────────
const deleteBulkNotes = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "A non-empty 'ids' array is required",
        data: null,
      });
    }

    // Validate every id in the array
    const allValid = ids.every((id) => isValidObjectId(id));
    if (!allValid) {
      return res.status(400).json({
        success: false,
        message: "One or more IDs have an invalid format",
        data: null,
      });
    }

    const result = await Note.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} notes deleted successfully`,
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

module.exports = {
  createNote,
  createBulkNotes,
  getAllNotes,
  getNoteById,
  replaceNote,
  updateNote,
  deleteNote,
  deleteBulkNotes,
};
