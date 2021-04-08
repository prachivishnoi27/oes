const express = require('express');
const Student = require('../models/student');
const Result = require('../models/result');
const studentAuth = require('../middlewares/studentAuth');

const router = new express.Router();

router.post('/student', async (req,res) => {
  // console.log(req.body);
  if(req.body.school === "") delete req.body.school;
  else if(req.body.collage === "") delete req.body.collage;
  // console.log(req.body);
  const student = new Student(req.body);
  try {
    await student.save()
    const token = await student.generateAuthToken();
    res.status(201).send({student, token});
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/student/login', async (req,res) => {
  console.log(req.body)
  try {
    const student = await Student.findByCredentials(req.body.email, req.body.password)
    const token = await student.generateAuthToken()
    res.status(200).send({ student, token})
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/student/logout', studentAuth, async (req, res) => {
  try {
    req.student.tokens = req.student.tokens.filter( token => token.token != req.token)
    await req.student.save()
    res.send('Student logged out successfully')
  } catch (e) {
    res.status(500).send()  
  }
})

router.get('/student/me', studentAuth, async (req,res) => {
  res.send(req.student)
})

router.post('/result/:code', studentAuth, async (req,res) => {
  const result = new Result({
    code: req.params.code,
    student_id: req.student._id,
    student_roll: req.student.rollno,
    student_name: req.student.name,
    answers: req.body.option 
  })
  console.log(result)
  try {
    await result.save()
    res.status(201).send(result)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/result/:code', studentAuth, async (req,res) => {
  try {
    const result = await Result.findOne({ code: req.params.code }).sort({'updatedAt': -1});
    const answer = [];
    for( var i in result.answers){
      answer.push(result.answers[i].value)
    }
    console.log(answer);
    res.send(answer);
  } catch (e) {
    res.status(400).send(e);
  }
})

module.exports = router;