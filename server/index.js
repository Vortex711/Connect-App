require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const userRoutes = require('./routes/routes')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to database and Listening to port ${PORT}`)
        })
    })

    .catch((err) => {
        console.log(err)
    })
        