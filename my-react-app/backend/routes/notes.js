const express = require("express");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");

const router = express.Router();

// Route 01: Get all notes using GET "/api/auth/fetchallnotes", login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route 02: Add a new note using POST "/api/auth/addnote", login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Create and save the new note
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// Route 03: Update an existing note using PUT "/api/auth/updatenote/:id", login required
router.put(
  "/updatenote/:id",
  fetchuser,
  async (req, res) => {
    const { title, description, tag } = req.body;

    // Create a newNote object
    const newNote = {};
    if (title) { newNote.title = title; }
    if (description) { newNote.description = description; }
    if (tag) { newNote.tag = tag; }

    try {
      // Find the note to be updated and update it
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }

      // Ensure the authenticated user is the owner of the note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      // Update the note with the specified id
      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );

      res.json({ note });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// Route 04: delete an existing note using DELETE "/api/auth/deletenote/:id", login required
router.delete(
  "/deletenote/:id",
  fetchuser,
  async (req, res) => {
    const { title, description, tag } = req.body;

    // Create a newNote object
    const newNote = {};
    if (title) { newNote.title = title; }
    if (description) { newNote.description = description; }
    if (tag) { newNote.tag = tag; }

    try {
      // Find the note to be delete and delete it
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }

      // Allow deletion only if user owns this Note 
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

     // Update the note with the specified id
      note = await Note.findByIdAndDelete(
        req.params.id,
        { $set: newNote },
        { new: true }
      );

      res.json({"Success" : "Note has been deleted "});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;