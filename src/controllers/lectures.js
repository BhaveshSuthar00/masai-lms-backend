const express = require("express");
const router = express.Router();
const moment = require("moment");
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
    const entryCount = await Lectures.count();
    const totalPages = Math.ceil(entryCount / size);
    console.log(req.query);
    return res
      .status(200)
      .json({ lectures: data, totalPages: totalPages, totalEntry: entryCount });
  } catch (err) {
    console.log(err);
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
    console.log(req.query.scheduled);
    // category=coding&scheduled=2022-10-14&type=assignment&instructor=nrupul dev&optional=true&
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
    data = await Lectures.find({ $and: drl })
      .skip((page - 1) * size)
      .limit(size)
      .lean()
      .exec();
    entryCount = await Lectures.count({ $and: drl });
    totalPages = Math.ceil(entryCount / size);
    // }
    return res
      .status(200)
      .json({ lectures: data, totalPages: totalPages, totalEntry: entryCount });
  } catch (err) {
    throw new Error(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const data = await Lectures.findById(req.params.id).lean().exec();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
});

router.post("/create", async (req, res) => {
  try {
    const data = await Lectures.create({
      ...req.body,
      creatingDate: moment().format(),
    });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    // creatingDate: moment().format("YYYY-MM-DD")
    const data = await Lectures.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      {
        new: true,
      }
    )
      .lean()
      .exec();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await Lectures.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
});
module.exports = router;
