const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true }
)

mongoose.connection.once('open', ()=>{
    console.log('mogodb connected')
})

const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')
app.use('/exercises', exercisesRouter)
app.use('/users',usersRouter)

app.listen(PORT, ()=> {
    console.log(`server is running on prot: ${PORT}`)
})
