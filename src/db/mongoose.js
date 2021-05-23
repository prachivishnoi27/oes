const mongoose = require("mongoose");
const key = require("../../config/config")

async function connectDb() {
  try {
    await mongoose.connect(key.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("Mongodb connected");
  } catch (error) {
       console.log("error connecting to db")
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDb;