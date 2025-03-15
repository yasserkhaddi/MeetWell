const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

const FRONT_URL = process.env.FRONT_URL;

app.use(
  cors({
    origin: FRONT_URL,
    credentials: true,
  })
);

module.exports = app;
