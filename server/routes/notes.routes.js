import express from "express";
import Notes from "../models/note.models.js";
import User from "../models/user.models.js";

const noteRouter = express.Router();

noteRouter.post("/add-note", async (req, res) => {
  const { title, content } = req.body;
  const token = req.headers.authorization;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided",
    });
  }

  try {
    let user = await User.findOne({ token });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    let newNote = new Notes({
      user: user.username,
      title,
      content,
    });

    await newNote.save();

    res.status(201).json({
      success: true,
      message: "Note added!",
      data: newNote,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default noteRouter;
