const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      trim: true,
      required: true,
    },
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Student",
    },
    student_roll: {
      type: String,
      required: true,
    },
    student_name: {
      type: String,
      required: true,
    },
    answers: [
      {
        value: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
