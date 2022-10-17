require("dotenv").config();
const express = require("express");
const app = express();
const connect = require("./config/db");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;

const assignemntController = require("./controllers/assignments");
const lectureController = require("./controllers/lectures");
app.use("/assignment", assignemntController);
app.use("/lecture", lectureController);
app.listen(PORT, async () => {
  await connect();
  console.log(`listing on ${PORT}`);
});
