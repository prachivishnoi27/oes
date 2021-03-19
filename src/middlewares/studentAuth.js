const jwt = require('jsonwebtoken')
const Student = require('../models/student')

const studentAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    // console.log(token);
    const decoded = jwt.verify(token, 'online examination system')
    const student = await Student.findOne({ _id: decoded._id, 'tokens.token': token})
    if(!student) {
      throw new Error()
    }

    req.token = token
    req.student = student
    next()
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate'})
  }
}

module.exports = studentAuth