require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const cors = require('cors')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')

const url_db = `mongodb+srv://deydevteam:${process.env.MONGOOSE_PASSWORD}@cluster0.bhhad.mongodb.net/Eric_DB?retryWrites=true&w=majority`
mongoose.connect(url_db,
    () => {
        console.log('connected')
    },
    e => {
        console.error(e)
    }
)

app.use(cors());
app.use(express.json());

app.use('/auth', authRoute);
app.use('/post', postRoute);

app.listen(PORT, ()=>console.log(`Listening at port ${PORT}...`))