const express = require('express')
const router = express.Router()
const {signup, login, verifyOTP} = require('../controllers/authController')

router.post('/signup', signup)
router.post('/login', login)
router.post('/verify-otp', verifyOTP)

module.exports =router;
