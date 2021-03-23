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
  marking: {
    positive: {
      type: String,
      required: true
    },
    negative: {
      type: String,
      required: true
    }
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