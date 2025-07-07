import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
});

const Notes = mongoose.model("Notes", noteSchema);

export default Notes;
