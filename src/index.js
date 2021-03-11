const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/admin");
const courseRouter = require("./routers/course");
const app = express();

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PATCH, POST, DELETE, HEAD, OPTIONS"
  );

  next();
});

app.use(userRouter);
app.use(courseRouter);

app.get("", (req, res) => {
  res.send("Hey there");
});

app.listen(5000, () => {
  console.log("server is up on port 5000");
});