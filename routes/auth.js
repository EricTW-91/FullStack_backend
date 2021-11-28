require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

router.post('/signup', async (req, res) => {
    try {
        const hashPW = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashPW
        })
        // console.log(newUser)

        return res.status(201).json({
            message: 'Successfully create an user',
            data: newUser
        })
    } catch (e){
        console.error(e.message)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        
        if (user) {
            const isCorrect = await bcrypt.compare(req.body.password, user.password)

            if (isCorrect) {
                const token = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)
                
                return res.status(201).json({
                    message: 'Successfully login',
                    data: user,
                    token
                })
            } else {
                return res.status(401).json({
                    message: 'Wrong password'
                })
            }
        } else {
            res.status(404).json({
                message: 'User not found',
            })
        }
    } catch (e){
        console.error(e.message)
    }
})

module.exports = router