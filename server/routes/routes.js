const express = require('express')
const { getUsers, addUser, loginUser, logoutUser } = require('../controllers/users')
const { requireAuth } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/home', requireAuth, getUsers)

router.post('/signup', addUser)

router.post('/login', loginUser)

router.get('/logout', logoutUser)

module.exports = router