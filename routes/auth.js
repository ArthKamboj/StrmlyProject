const express = require('express')
const router = express.Router()
const {signup, login, verifyOTP} = require('../controllers/authController')
const{authLimiter} = require('../middleware/rateLimiter')

router.post('/signup', signup)
router.post('/login', login)
router.post('/verify-otp', authLimiter, verifyOTP)

module.exports =router;
