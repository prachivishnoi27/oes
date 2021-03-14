const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Student'
  },
  student_roll:{
    type: String,
    required: true
  },
  marks: {
    type: String,
    required: true
  }
}, 
{
  timestamps: true
})

const Result = mongoose.model('Result', resultSchema)

module.exports = Result