require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const videoRoutes = require('./routes/video')

const app = express();

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api', videoRoutes)

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(3000, () => console.log('Server running on port 3000'))
    })
    .catch(e => console.error(e))