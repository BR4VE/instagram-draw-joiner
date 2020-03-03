const express = require("express");

// initilize app from express
const app = express();

// init dotenv
require("dotenv").config();

// midleware imports
const enableCron = require("./middlewares/enableCron");

// helper imports
const joinBookDraws = require("./helpers/puppeteer/joinBookDraws");
const joinGeneralDraws = require("./helpers/puppeteer/joinGeneralDraws");

app.get("/join_draws", enableCron(), async (req, res) => {
  res.end();
  await joinBookDraws();
  await joinGeneralDraws();
});

// listen to the port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is started");
});
