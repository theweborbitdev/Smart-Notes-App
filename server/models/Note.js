const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [120, "Title cannot exceed 120 characters"]
    },
    content: {
      type: String,
      trim: true,
      default: "",
      maxlength: [5000, "Content cannot exceed 5000 characters"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Note", noteSchema);

