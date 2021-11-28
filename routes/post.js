const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const authToken = require('../modules/authToken')
// const User = require('../models/user')

router.get('/getPosts', authToken, async (req, res) => {
    // console.log(req.user)
    return res.status(201).json({
        message: 'Got posts',
        data: req.user
    })
})

router.post('/newPost', authToken, async (req, res) => {
    // const id = await User.find()
    const newPost = await Post.create({
        userID: req.user._id,
        title: req.body.title,
        content: req.body.content
    })

    return res.status(201).json({
        message: 'Create a post',
        data: newPost
    })
})

router.get('/getPosts/:id', authToken, async (req, res) => {
    const posts = await Post.find({userID: req.params.id})

    return res.status(201).json({
        message: 'Successfully fetch posts',
        data: posts
    })
})

module.exports = router;