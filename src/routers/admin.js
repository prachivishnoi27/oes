const express = require('express')
const Admin = require('../models/admin')
const adminAuth = require('../middlewares/adminAuth')

const router = new express.Router()

router.post('/admin', async (req,res) => {
  const admin = new Admin(req.body)
  console.log(admin);
  try {
    await admin.save()
    const token = await admin.generateAuthToken()
    // console.log(token)
    res.status(201).send({ admin,token })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/admin/login', async (req,res) => {
  // console.log(req.body);
  try {
    const admin = await Admin.findByCredentials(req.body.email, req.body.password)
    const token = await admin.generateAuthToken()
    res.send({ admin, token})
  } catch (e) {
    res.status(400).send({'error': 'Please authenticate'})
  }
})

router.post('/admin/logout', adminAuth, async (req, res) => {
  try {
    req.admin.tokens = req.admin.tokens.filter( token => token.token!= req.token)
    await req.admin.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/admin/me', adminAuth, async (req,res) => {
  res.send(req.admin)
})

module.exports = router