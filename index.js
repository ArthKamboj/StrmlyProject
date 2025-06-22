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
app.use(express.urlencoded({extended: true}))

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api', videoRoutes)

app.get('/', (req, res) => {res.render('home');});
app.get('/signup', (req,res) => {res.render('signup')})
app.get('/login', (req, res) => {res.render('login')})
app.get('/verify-otp', (req, res) => {res.render('otp', {email: req.query.email})})
app.get('/forgot-password', (req, res) => {res.render('forgot-password')})
app.get('/verify-reset-otp', (req, res) => {res.render('verify-reset-otp', {email: req.query.email})})
app.get('/reset-password', (req, res) => {res.render('reset-password', {email: req.query.email, otp: req.query.otp})})




mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(3000, () => console.log('Server running on port 3000'))
    })
    .catch(e => console.error(e))