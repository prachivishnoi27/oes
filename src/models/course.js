const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    trim: true
  },
  name: {
    type: String
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

const Course = mongoose.model('Course', courseSchema)

module.exports = Course