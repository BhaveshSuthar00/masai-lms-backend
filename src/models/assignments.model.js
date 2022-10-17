const mongoose = require("mongoose");
const assignmentSchema = new mongoose.Schema(
  {
    headers: { type: String, required: true },
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, required: true },
    Scheduled: { type: Date, required: true },
    optional: { type: Boolean, required: true },
    description: { type: String, required: true },
    links: [{ type: String }],
  },
  {
    versionKey: false,
  }
);

const assignment = mongoose.model("assignment", assignmentSchema);

module.exports = assignment;
