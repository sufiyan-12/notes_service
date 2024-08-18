const express = require("express");
const { createNote, getNotes, deleteNote, updateNote } = require("../controllers/noteController");
const noteRoute = express.Router();
const auth = require("../middleware/auth")

noteRoute.get("/", auth, getNotes)

noteRoute.post("/", auth, createNote)

noteRoute.delete("/:id", auth, deleteNote)

noteRoute.put("/:id", auth, updateNote)

module.exports = noteRoute;