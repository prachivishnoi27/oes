const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const courseRouter = require("./routers/course");
const app = express();

app.use(express.json())

app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Methods", "OPTIONS,GET,PATCH,POST,DELETE");

//   res.header(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN"
//   );

res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD, OPTIONS"); 

  next();
});

// res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();

app.use(userRouter);
app.use(courseRouter);

app.get("", (req, res) => {
  res.send("Hey there");
});

app.listen(5000, () => {
  console.log("server is up on port 5000");
});
