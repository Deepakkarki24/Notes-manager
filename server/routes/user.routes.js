import express from "express";
import User from "../models/user.models.js";
import { v4 as uuidv4 } from "uuid";

const userRouter = express.Router();

userRouter.post("/sign-in", async (req, res) => {
  let { username } = req.body;

  console.log(username);

  if (!username) {
    return res.status(400).json({
      success: false,
      message: "Username is required",
    });
  }

  if (username.length < 4) {
    return res.status(400).json({
      success: false,
      message: "Username length is greater than 3",
    });
  }
  let token = uuidv4();

  try {
    let userFound = await User.findOne({ username: username });

    if (userFound) {
      return res.status(409).json({
        success: false,
        message: "User already exist!",
      });
    }

    let newUser = new User({
      username: username,
      token: token,
    });

    let savedUser = await newUser.save();

    if (!savedUser) {
      return res.status(500).json({
        success: false,
        message: "Error while save the user",
      });
    }

    res.status(200).json({
      success: true,
      message: "User data saved",
      data: savedUser,
    });
  } catch (err) {
    res.status(502).json({
      success: false,
      message: err.message,
    });
  }
});

export default userRouter;
