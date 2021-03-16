const express = require('express');
const Student = require('../models/student');
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

module.exports = router;