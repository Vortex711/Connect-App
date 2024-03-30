require('dotenv').config()

const User = require('../models/users')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
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
        const errors = handleErrors(err)
        console.log(errors)
        res.status(400).json(errors)
    }
}

module.exports = { getUsers, addUser }
