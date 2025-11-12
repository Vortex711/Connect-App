require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const userRoutes = require('./routes/userRoutes')
const ratingRoutes = require('./routes/ratingRoutes')
const likeRoutes = require('./routes/likeRoutes')
const dislikeRoutes = require('./routes/dislikeRoutes')
const { checkUser } = require('./middleware/authMiddleware')

const app = express()

const allowedOrigins = [
    'http://localhost:3000', // Local development
    'https://connect-app-frontend-eight.vercel.app'
]

app.use(cors(
    {   
        origin: (origin, callback) => {
            if (allowedOrigins.includes(origin) || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ["POST", "GET", "PATCH", "DELETE", "OPTIONS"],
        credentials: true
    }
))
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api/users', userRoutes)
app.use('/api/ratings', ratingRoutes)
app.use('/api/likes', likeRoutes)
app.use('/api/dislikes', dislikeRoutes)

app.get('/', (req, res) => {
    res.json("Hello");
})

const PORT = 4000
const MONGO_URI = "mongodb+srv://chinmayhari711:<db_password>@mernapp.a9muixg.mongodb.net/"

mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to database and Listening to port ${PORT}`)
        })
    })

    .catch((err) => {
        console.log(err)
    })

module.exports = app;
