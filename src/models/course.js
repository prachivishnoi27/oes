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

courseSchema.methods.addNewQues = async function ( question ) {
  const course = this;
  course.questions = course.questions.concat(question);
  await course.save();
  return course.questions;
};

courseSchema.methods.deleteQues = async function ( id ) {
  const course = this;
  const questions = course.questions;
  course.questions = questions.filter(question => question._id != id )
  // console.log(course.questions.length);
  await course.save();
  return course.questions;
}

courseSchema.methods.modifyQues = async function ( questions ) {
  const course = this;
  course.questions = questions;
  await course.save();
  return course.questions;
} 

const Course = mongoose.model('Course', courseSchema)

module.exports = Course