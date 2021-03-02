const express = require('express')
const Course = require('../models/course')
const auth = require('../middlewares/adminAuth')
const router = new express.Router()

router.post('/courses', auth, async (req, res) => {
  console.log(req.user)
  const course = new Course({
    ...req.body,
    owner: req.user._id
  })

  try {
    await course.save()
    res.status(201).send(course)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/courses', auth, async (req, res) => {
  try {
    await req.user.populate('courses').execPopulate()
    res.status(200).send(req.user.courses)
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

router.get('/courses/:code', auth, async (req, res) => {
  const code = req.params.code
  try {
    const course = await Course.findOne({ code, owner: req.user._id })
    console.log(course)
    if(!course){
      return res.status(404).send()
    }
    res.status(200).send(course)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.patch('/courses/:code', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['questions', 'name']
  const isValidOperation = updates.every( update => allowedUpdates.includes(update))

  if(!isValidOperation){
    return res.status(400).send({ 'error':  'Invalid Updates!'})
  }
  // console.log(isValidOperation)

  try {
    const course = await Course.findOne({ code: req.params.code, owner: req.user._id})
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

router.patch('/courses/:code/addques', auth, async (req, res) => {
  try {
    const course = await Course.findOne({ code: req.params.code, owner: req.user._id})
    console.log(course.questions);
    res.status(200).send(course.questions);
  } catch (e) {
    res.status(400).send();
  }
})

module.exports = router