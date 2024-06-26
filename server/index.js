require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const userRoutes = require('./routes/userRoutes')
const ratingRoutes = require('./routes/ratingRoutes')
const likeRoutes = require('./routes/likeRoutes')
const dislikeRoutes = require('./routes/dislikeRoutes')
const { checkUser } = require('./middleware/authMiddleware')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api/users', userRoutes)
app.use('/api/ratings', ratingRoutes)
app.use('/api/likes', likeRoutes)
app.use('/api/dislikes', dislikeRoutes)

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
        