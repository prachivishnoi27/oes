const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const app = express()

app.use(express.json())
app.use(userRouter)

app.get('' , (req,res) => {
    res.send('Hey there')
})

app.listen(5000, () => {
    console.log('server is up on port 5000')
})