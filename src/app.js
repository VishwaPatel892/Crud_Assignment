const express = require("express");
const noteRouter = require("./routes/note.routes");

const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────────
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────────────────────────
app.use("/api/notes", noteRouter);

// ── 404 fallback ────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    data: null,
  });
});

module.exports = app;
