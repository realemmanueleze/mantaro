require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connectDB");

const app = express();

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
