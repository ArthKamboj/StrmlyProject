require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const cors = require('cors')
const path = require('path')
const authRoutes = require('./routes/auth')
const videoRoutes = require('./routes/video')

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api', videoRoutes)

app.get('/', (req, res) => {
  res.render('index');
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(3000, () => console.log('Server running on port 3000'))
    })
    .catch(e => console.error(e))