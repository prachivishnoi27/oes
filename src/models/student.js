const mongoose = require('mongoose');
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema({
  rollno: {
    type: String,
    unique: true,
    trim: true,
    required: true
  }, 
  name: {
    type: String,
    required: true
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
    }
  },
  school: {
    type: String,
    trim: true
  },
  collage: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
})

studentSchema.virtual('result', {
  ref: 'Result',
  localField: '_id',
  foreignField: 'student_id'
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;