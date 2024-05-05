require("dotenv").config();
require("express-async-errors");

//express
const express = require("express");
const app = express();

//other packages

//database
const connectDB = require("./db/connectDB");

//routes

//middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.static("./public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send(`<h1>Mantaro Api</h1>`);
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//connect to MongoDB and listen on port
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
