const express = require('express')
const { getUsers, addUser, loginUser } = require('../controllers/users')
const requireAuth = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/home', requireAuth, getUsers)

router.post('/signup', addUser)

router.post('/login', loginUser)

module.exports = router