const express = require('express')
const { getUsers, addUser } = require('../controllers/users')

const router = express.Router()

router.get('/home', getUsers)

router.post('/signup', addUser)

router.get('/setcookie', (req, res) => {
    res.cookie('newUser', false)
    res.send('You got the cookies')
})

module.exports = router