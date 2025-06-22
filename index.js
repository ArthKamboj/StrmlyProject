require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const cors = require('cors')
const path = require('path')
const authRoutes = require('./routes/auth')
const videoRoutes = require('./routes/video')
const verifyToken = require('./middleware/authMiddleware')
const cookieParser = require('cookie-parser')
const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https://res.cloudinary.com/'],
      mediaSrc: ['https://res.cloudinary.com/'],
      connectSrc: ["'self'"],
    },
  },
}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
// app.use(helmet())
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/videos', videoRoutes)

app.get('/', (req, res) => {res.render('home');});
app.get('/signup', (req,res) => {res.render('signup')})
app.get('/login', (req, res) => {res.render('login')})
app.get('/verify-otp', (req, res) => {res.render('otp', {email: req.query.email})})
app.get('/forgot-password', (req, res) => {res.render('forgot-password')})
app.get('/verify-reset-otp', (req, res) => {res.render('verify-reset-otp', {email: req.query.email})})
app.get('/reset-password', (req, res) => {res.render('reset-password', {email: req.query.email, otp: req.query.otp})})
const jwt = require('jsonwebtoken')
const User = require('./models/User')

app.get('/dashboard', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login')

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const user = await User.findById(decoded.userId)

    if (!user) return res.redirect('/login')

    res.render('dashboard', { user })
  } catch (err) {
    console.error(err)
    res.redirect('/login')
  }
})

app.get('/upload', verifyToken, (req, res) => {res.render('upload')})
app.get('/videos', (req, res) => {res.render('videos')})






mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(3000, () => console.log('Server running on port 3000'))
    })
    .catch(e => console.error(e))