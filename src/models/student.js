const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema(
  {
    rollno: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Enter valid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 7,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password should not contain password");
        }
      },
    },
    contact: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length !== 10) {
          throw new Error("Contact Number should be of 10 digits");
        }
      },
    },
    school: {
      type: String,
      trim: true,
    },
    collage: {
      type: String,
      trim: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

studentSchema.virtual("result", {
  ref: "Result",
  localField: "_id",
  foreignField: "student_id",
});

studentSchema.methods.generateAuthToken = async function () {
  const student = this;
  const token = jwt.sign(
    { _id: student._id.toString() },
    "online examination system"
  );
  student.tokens = student.tokens.concat({ token });
  await student.save();
  return token;
};

studentSchema.statics.findByCredentials = async (email, password) => {
  const student = await Student.findOne({ email });
  if (!student) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, student.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return student;
};

studentSchema.pre("save", async function (next) {
  const student = this;
  if (student.isModified("password")) {
    student.password = await bcrypt.hash(student.password, 8);
    // console.log(student.password);
  }
  // console.log(student);
  next();
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
