const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Admin'
  },
  level: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  questions: [{
    ques: {
      type: String
    },
    options: [{
      value: {
        type: String
      }
    }],
    answer: {
      type: String
    },
    marks_correct: {
      type: String
    },
    marks_wrong: {
      type: String
    }
  }]
}, {
  timestamps: true
})

courseSchema.methods.addNewQues = async function ( ques ) {
  const course = this;
  course.questions = course.questions.concat(ques);
  await course.save();
  return course.questions;
};

const Course = mongoose.model('Course', courseSchema)

module.exports = Course