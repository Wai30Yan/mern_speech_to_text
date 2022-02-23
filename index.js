import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import speechRoute from './routes/speech.js'
import userRoute from './routes/user.js'

import path from 'path'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// const path = require("path")

const app = express()
dotenv.config()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use('/speech', speechRoute)
app.use('/user', userRoute)

// const __dirname = path.dirname(__filename);
// app.use(express.static(__dirname));
app.use(express.static(path.join(path.dirname('/frontend'), path.dirname('/build'))));

app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname, 'index.html'));
  res.sendFile(path.join(path.dirname('/frontend'), path.dirname('/build'), __filename));
});

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))
