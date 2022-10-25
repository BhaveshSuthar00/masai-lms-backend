const mongoose = require("mongoose");

const lecturesSchema = new mongoose.Schema(
  {
    headers: { type: String, required: true },
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    scheduled: { type: Date, required: true },
    creatingDate: { type: String, required: true },
    optional: { type: Boolean, required: true, default: false },
    description: { type: String, required: true },
    link: { type: String },
    video: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const lectures = mongoose.model("lecture", lecturesSchema);

module.exports = lectures;
