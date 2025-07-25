import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  token: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
