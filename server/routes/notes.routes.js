import express from "express";
import Note from "../models/note.models.js";
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

    let newNote = new Note({
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

noteRouter.get("/get-notes", async (req, res) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(409).json({
      success: false,
      message: "Token not found or user not logged in!",
    });
  }

  try {
    let user = await User.findOne({ token: token });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found!",
      });
    }

    let data = await Note.find({ user: user.username });

    if (!data) {
      return res.status(401).json({
        success: false,
        message: "data not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Succesfully fetched notes",
      data: data,
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
});

export default noteRouter;
