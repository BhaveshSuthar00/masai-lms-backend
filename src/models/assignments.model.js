const mongoose = require("mongoose");
const assignmentSchema = new mongoose.Schema(
  {
    headers: { type: String, required: true },
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, required: true },
    scheduled: { type: Date, required: true },
    optional: { type: Boolean, required: true },
    description: { type: String, required: true },
    links: [{ type: String }],
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
  },
  {
    versionKey: false,
  }
);

const assignment = mongoose.model("assignment", assignmentSchema);

module.exports = assignment;
