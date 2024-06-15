const User = require('../models/users')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const handleSignUpErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { 'username': '', 'password': '', 'name': '', 'age': '', 'gender': ''}

    if (err.code === 11000) {
        errors.username = 'User already exists!'
        return errors
    }

    if (err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            console.log(properties.path)
            errors[properties.path] = properties.message
        });
    }
    return errors
}

const handleLoginErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { 'username': '', 'password': ''}

    if (err.message === 'Invalid username!') {
        errors['username'] = err.message
    } 

    if (err.message === 'Invalid password!') {
        errors['password'] = err.message
    } 

    return errors
}

const secret = process.env.SECRET
const maxAge = 5 * 60
const createToken = (id) => {
    return jwt.sign({ id }, secret, {
        expiresIn: maxAge
    })
}

const getUsers = async (req, res) => {
    console.log('GET USERS')
    const users = await User.find({}).sort({createdAt: -1})
    res.status(200).json(users)
}

const getUser =  async (req, res) => {
    console.log('GET SINGLE USER')
    const { userId } = req.params
    console.log(userId)
    try {
        const user = await User.findById(userId)
        return res.status(200).json(user)
    } catch(err) {
        console.log(err)
        return res.status(400).json(err)
    }
}

const addUser = async (req, res) => {
    console.log('POST USER')
    const {username, password, name, age, gender} = req.body
    try{
        const user = await User.create({username, password, name, age, gender })
        const token = createToken(user._id)
        res.cookie('jwt', token, {
            httpOnly: true, maxAge: maxAge * 1000
        })
        res.status(201).json({user: user._id})
    } catch(err){
        const errors = handleSignUpErrors(err)
        console.log(errors)
        res.status(400).json(errors)
    }
}

const loginUser = async (req, res) => {
    console.log('LOGIN USER')
    const {username, password} = req.body
    console.log(username, password)
    try {
        const user = await User.login(username, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {
            httpOnly: true, maxAge: maxAge * 1000
        })
        res.status(200).json({user: user._id})
    }
    catch(err) {
        const errors = handleLoginErrors(err)
        res.status(400).json(errors)
    }
}

const logoutUser = (req, res) => {
    console.log('Logging out')
    res.cookie('jwt', '', { maxAge: 1 / 1000 })
    res.status(200).json('Done')
}

module.exports = { getUsers, getUser, addUser , loginUser, logoutUser}
