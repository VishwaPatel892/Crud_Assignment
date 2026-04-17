const express = require("express");
const router = express.Router();

const {
  createNote,
  createBulkNotes,
  getAllNotes,
  getNoteById,
  replaceNote,
  updateNote,
  deleteNote,
  deleteBulkNotes,
} = require("../controllers/note.controller");

// ── Bulk routes MUST come before /:id routes to avoid "bulk" being matched as an id ──
router.post("/bulk", createBulkNotes);       // POST   /api/notes/bulk
router.delete("/bulk", deleteBulkNotes);     // DELETE /api/notes/bulk

router.post("/", createNote);                // POST   /api/notes
router.get("/", getAllNotes);                // GET    /api/notes
router.get("/:id", getNoteById);             // GET    /api/notes/:id
router.put("/:id", replaceNote);             // PUT    /api/notes/:id
router.patch("/:id", updateNote);            // PATCH  /api/notes/:id
router.delete("/:id", deleteNote);           // DELETE /api/notes/:id

module.exports = router;
