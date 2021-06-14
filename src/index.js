const express = require("express");
const connectDb = require("./db/mongoose");
const path = require("path")
const cors = require("cors")
const userRouter = require("./routers/admin");
const courseRouter = require("./routers/course");
const studentRouter = require('./routers/student');
connectDb()
const app = express();

console.log(process.env);

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors);

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
app.use(studentRouter);

if(process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log("server is up on port 5000");
});