const express = require("express");
const router = express.Router();
const Lectures = require("../models/lectures.model");
router.get("/", async (req, res) => {
  try {
    const size = req.query.size || 3;
    const page = req.query.page || 1;
    const data = await Lectures.find()
      .skip((page - 1) * size)
      .limit(size)
      .lean()
      .exec();
    const totalPages = Math.ceil(data.length / size);
    return res.status(200).json({ lectures: data, totalPages: totalPages });
  } catch (err) {
    console.log(err);
  }
});
router.post("/create", async (req, res) => {
  try {
    const data = await Lectures.create(req.body);
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
