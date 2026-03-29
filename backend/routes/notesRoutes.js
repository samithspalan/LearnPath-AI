import express from "express";
import Note from "../models/Note.js";
import { requireAuth as clerkRequireAuth } from "@clerk/express";

const router = express.Router();

// Middleware to verify Clerk authentication
const authMiddleware = async (req, res, next) => {
  try {
    // Get auth from req.auth() function (updated Clerk API)
    const auth = typeof req.auth === 'function' ? await req.auth() : req.auth;
    
    if (!auth || !auth.userId) {
      console.error("Auth check failed - auth:", auth);
      return res.status(401).json({ 
        error: "Unauthorized",
        details: "Authentication token is missing or invalid"
      });
    }
    
    // Store auth in req for use in route handlers
    req.authInfo = auth;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    res.status(401).json({ 
      error: "Authentication failed",
      details: err.message
    });
  }
};

// Get all notes for current user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.authInfo.userId;
    console.log("Fetching notes for userId:", userId);
    
    const notes = await Note.find({ userId }).sort({ updatedAt: -1 });
    
    console.log("Found notes:", notes.length);
    res.json(notes);
  } catch (err) {
    console.error("GET /notes error:", err.message, err.stack);
    res.status(500).json({ 
      error: "Failed to fetch notes", 
      details: err.message 
    });
  }
});

// Create a new note
router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.authInfo.userId;
    const { title, content } = req.body;
    
    console.log("Creating note for userId:", userId, { title, contentLength: content?.length });
    
    if (!content || content.trim() === '') {
      return res.status(400).json({ error: "Content is required" });
    }
    
    const note = new Note({ 
      userId, 
      title: (title && title.trim()) || "Untitled Note", 
      content: content.trim()
    });
    
    await note.save();
    
    console.log("Note saved successfully:", note._id);
    res.status(201).json(note);
  } catch (err) {
    console.error("POST /notes error:", err.message, err.stack);
    res.status(500).json({ 
      error: "Failed to save note", 
      details: err.message 
    });
  }
});

// Update a note
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.authInfo.userId;
    const { id } = req.params;
    const { title, content } = req.body;
    
    console.log("Updating note:", id, "for userId:", userId);
    
    if (!content || content.trim() === '') {
      return res.status(400).json({ error: "Content is required" });
    }
    
    const note = await Note.findOneAndUpdate(
      { _id: id, userId },
      { 
        title: (title && title.trim()) || "Untitled Note", 
        content: content.trim(),
        updatedAt: new Date()
      },
      { new: true }
    );
    
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    
    console.log("Note updated successfully:", note._id);
    res.json(note);
  } catch (err) {
    console.error("PUT /notes error:", err.message, err.stack);
    res.status(500).json({ 
      error: "Failed to update note", 
      details: err.message 
    });
  }
});

// Delete a note
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.authInfo.userId;
    const { id } = req.params;
    
    console.log("Deleting note:", id, "for userId:", userId);
    
    const note = await Note.findOneAndDelete({ _id: id, userId });
    
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    
    console.log("Note deleted successfully:", note._id);
    res.json({ success: true });
  } catch (err) {
    console.error("DELETE /notes error:", err.message, err.stack);
    res.status(500).json({ 
      error: "Failed to delete note", 
      details: err.message 
    });
  }
});

export default router;
