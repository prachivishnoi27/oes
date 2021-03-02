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
  questions: [{
    ques: {
      type: String
    },
    options: [{
      a: {
        type: String
      },
      b: {
        type: String
      },
      c: {
        type: String
      },
      d: {
        type: String
      }
    }],
    ans: {
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