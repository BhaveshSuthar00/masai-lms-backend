const express = require("express");
const router = express.Router();
const Assignment = require("../models/assignments.model");
router.get("/", async (req, res) => {
  try {
    let size = req.query.size || 3;
    let page = req.query.page || 1;
    const data = await Assignment.find()
      .skip((page - 1) * size)
      .limit(size)
      .lean()
      .exec();
    const totalPages = Math.ceil(data.length / size);
    return res.status(200).json({ assignment: data, totalPages: totalPages });
  } catch (err) {
    console.log(err);
  }
});
router.post("/create", async (req, res) => {
  try {
    const data = await Assignment.create(req.body);
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
