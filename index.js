import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import speechRoute from './routes/speech.js'
import userRoute from './routes/user.js'

import path from 'path'

const app = express()
dotenv.config()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use('/speech', speechRoute)
app.use('/user', userRoute)

app.use(express.static(path.join(process.cwd(), '/frontend/build')));
// app.use(express.static(path.join('/frontend', '/build')));

console.log(path.join('/frontend', '/build'))
console.log("individual", express.static(path.join('/frontend', '/build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/frontend/build/index.html'))
  // res.sendFile(path.join('/frontend', '/build', 'index.html'));
});

console.log("sendFile path", path.join('/frontend', '/build', 'index.html'))

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))
