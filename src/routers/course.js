const express = require('express')
const Course = require('../models/course')
const adminAuth = require('../middlewares/adminAuth')
const studentAuth = require('../middlewares/studentAuth')
const router = new express.Router()

router.post('/courses', adminAuth, async (req, res) => {
  const course = new Course({
    ...req.body,
    owner: req.admin._id
  })

  try {
    await course.save()
    res.status(201).send(course)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/courses', adminAuth, async (req, res) => {
  try {
    await req.admin.populate('courses').execPopulate()
    res.status(200).send(req.admin.courses)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/allcourses', async (req,res) => {
  try {
    const allcourses = await Course.find({})
    if(!allcourses){
      return res.status(404).send()
    } 
    res.status(200).send(allcourses)
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/:code', async (req, res) => {
  const code = req.params.code
  try {
    const course = await Course.findOne({ code })
    // console.log(course)
    if(!course){
      return res.status(404).send()
    }
    course.questions = [];
    res.status(200).send(course)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/answers/:code', async (req, res) => {
  // console.log(req.params.code);
  try {
    const course = await Course.findOne({ code: req.params.code }, {}, { sort: { 'created_at' : -1 } })
    if(!course) { 
      return res.status(404).send()
    }
    const answers = [{}];
    course.questions.map( question => {
      // answers.push(question.answer);
      answers.push({ answer: question.answer, correct: question.marks_correct, wrong: question.marks_wrong}) 
    })
    // console.log(answers.length);
    res.status(200).send(answers)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/courses/:code', adminAuth, async (req, res) => {
  const code = req.params.code
  try {
    const course = await Course.findOne({ code, owner: req.admin._id })
    // console.log(course)
    if(!course){
      return res.status(404).send()
    }
    res.status(200).send(course)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/courses/:code/questions', studentAuth, async (req, res) => {
  try {
    const course = await Course.findOne({ code: req.params.code })
    if(!course) { 
      return res.status(404).send()
    }
    res.status(200).send(course.questions)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/courses/:code/:quesid', adminAuth, async (req, res) => {
  try {
    const course = await Course.findOne({ code: req.params.code, owner: req.admin._id });
    const questions = course.questions;
    const quesIndex = questions.findIndex(ques => ques._id == req.params.quesid);
    res.send(questions[quesIndex]);
  } catch (e) {
    res.status(400).send(e);
  }
})

router.patch('/courses/:code', adminAuth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['questions', 'name']
  const isValidOperation = updates.every( update => allowedUpdates.includes(update))

  if(!isValidOperation){
    return res.status(400).send({ 'error':  'Invalid Updates!'})
  }

  try {
    const course = await Course.findOne({ code: req.params.code, owner: req.admin._id})
    // console.log(course)
    if(!course) {
      return res.status(404).send()
    }
    updates.forEach( update => course[update] = req.body[update])
    await course.save()
    res.status(200).send(course)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.patch('/deleteques/:code/:id', adminAuth, async (req, res) => {
  try {
    const course = await Course.findOne({ code: req.params.code, owner: req.admin._id});
    const modifiedQuestions = await course.deleteQues(req.params.id);
    res.status(200).send(modifiedQuestions)
  } catch (e) {
    res.status(400).send('Cannot delete question')
  }
})

router.patch('/courses/:code/addques', adminAuth, async (req, res) => {
  try {
    const course = await Course.findOne({ code: req.params.code, owner: req.admin._id})
    const modifiedCourse = await course.addNewQues(req.body);
    res.status(200).send(modifiedCourse);
  } catch (e) {
    res.status(400).send(e);
  }
})

router.patch('/courses/:code/:quesid', adminAuth, async (req, res) => {
  try {
    const course = await Course.findOne({ code: req.params.code, owner: req.admin._id });
    const questions = course.questions;
    // console.log(questions);
    // console.log(req.params.quesid);
    const modifyQuesIndex = questions.findIndex(ques => ques._id == req.params.quesid);
    // console.log(modifyQuesIndex)
    questions[modifyQuesIndex] = req.body;
    const modifiedQuestions = await course.modifyQues(questions);
    res.send(modifiedQuestions);
  } catch (e) {
    res.status(400).send(e);
  }
})

module.exports = router