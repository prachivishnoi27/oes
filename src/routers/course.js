const express = require('express')
const Course = require('../models/course')
const adminAuth = require('../middlewares/adminAuth')
const router = new express.Router()

router.post('/courses', adminAuth, async (req, res) => {
  const course = new Course({
    ...req.body,
    owner: req.admin._id
  })

  console.log(course);

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

router.get('/courses/:code', async (req, res) => {
  const code = req.params.code
  try {
    const course = await Course.findOne({ code })
    console.log(course)
    if(!course){
      return res.status(404).send()
    }
    course.questions = [];
    res.status(200).send(course)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/courses/:code', adminAuth, async (req, res) => {
  const code = req.params.code
  try {
    const course = await Course.findOne({ code, owner: req.admin._id })
    console.log(course)
    if(!course){
      return res.status(404).send()
    }
    res.status(200).send(course)
  } catch (e) {
    res.status(500).send(e)
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

router.patch('/courses/:code/addques', adminAuth, async (req, res) => {
  try {
    const course = await Course.findOne({ code: req.params.code, owner: req.admin._id})
    // console.log(course.questions.length);
    // console.log(req.body);
    const modifiedCourse = await course.addNewQues(req.body);
    // console.log(modifiedCourse.length);
    res.status(200).send(modifiedCourse);
  } catch (e) {
    res.status(400).send();
  }
})

module.exports = router