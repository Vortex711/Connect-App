const express = require('express')
const { getUsers, addUser, loginUser, logoutUser, getUser } = require('../controllers/users')
const { requireAuth, checkUser } = require('../middleware/authMiddleware')

const router = express.Router()

router.use(checkUser)

router.get('/home', requireAuth, getUsers)

router.get('/logout', logoutUser)

router.get('/:userId', getUser)

router.post('/signup', addUser)

router.post('/login', loginUser)

module.exports = router