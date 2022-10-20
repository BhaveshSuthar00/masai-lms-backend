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
    const entryCount = await Assignment.count();
    const totalPages = Math.ceil(entryCount / size);
    return res.status(200).json({
      assignment: data,
      totalPages: totalPages,
      totalEntry: entryCount,
    });
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
});
router.post("/create", async (req, res) => {
  try {
    const newDate = new Date();
    const data = await Assignment.create({
      ...req.body,
      scheduled: new Date(),
      fromDate: new Date(newDate.getDate() + 1),
      toDate: new Date(newDate.getDate() + 7),
    });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Assignment.findById(req.params.id).lean().exec();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    // const newDate = new Date();
    // let formDate = newDate.setDate(newDate.getDate() + 1);
    // let toDate = newDate.setDate(newDate.getDate() + 7);
    // req.body = {
    //   fromDate: formDate,
    //   toDate: toDate,
    // };
    const data = await Assignment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await Assignment.findByIdAndDelete(req.params.id)
      .lean()
      .exec();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
});
module.exports = router;
