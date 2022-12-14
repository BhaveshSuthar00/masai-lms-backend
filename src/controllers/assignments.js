const express = require("express");
const router = express.Router();
const moment = require("moment");
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
    throw new Error(err);
  }
});
router.post("/create", async (req, res) => {
  try {
    // const newDate = new Date();
    const data = await Assignment.create({
      ...req.body,
      scheduled: new Date(),
      creatingDate: moment(new Date()).format("YYYY-MM-DD"),
    });
    // fromDate: new Date(newDate.getDate() + 1),
    // toDate: new Date(newDate.getDate() + 7),
    return res.status(200).json(data);
  } catch (err) {
    throw new Error(err);
  }
});

router.get("/api", async (req, res) => {
  try {
    const size = req.query.size || 3;
    const page = req.query.page || 1;
    let data;
    let entryCount;
    let totalPages;
    const list = ["type", "category", "scheduled", "instructor", "optional"];
    let drl = [];
    for (let key in req.query) {
      if (list.includes(key)) {
        if (key === "scheduled") {
          drl.push({ creatingDate: req.query[key] });
        } else {
          drl.push({ [key]: req.query[key] });
        }
      }
    }
    data = await Assignment.find({ $and: drl })
      .skip((page - 1) * size)
      .limit(size)
      .lean()
      .exec();
    entryCount = await Assignment.count({ $and: drl });
    totalPages = Math.ceil(entryCount / size);
    return res.status(200).json({
      assignment: data,
      totalPages: totalPages,
      totalEntry: entryCount,
    });
  } catch (err) {
    throw new Error(err);
  }
});

router.get("/single/:id", async (req, res) => {
  try {
    const data = await Assignment.findById(req.params.id).lean().exec();
    return res.status(200).json(data);
  } catch (err) {
    throw new Error(err);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const data = await Assignment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(200).json(data);
  } catch (err) {
    throw new Error(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await Assignment.findByIdAndDelete(req.params.id)
      .lean()
      .exec();
    return res.status(200).json(data);
  } catch (err) {
    throw new Error(err);
  }
});
module.exports = router;
