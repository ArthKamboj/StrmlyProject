const express = require('express')
const router = express.Router()
const {signup, login, verifyOTP, resendOTP, forgotPassword, verifyResetOTP, resetPassword} = require('../controllers/authController')
const{authLimiter} = require('../middleware/rateLimiter')

router.post('/signup', signup)
router.post('/login', login)
router.post('/verify-otp', authLimiter, verifyOTP)
router.post('/resend-otp', resendOTP)
router.post('/forgot-password', forgotPassword)
router.post('/verify-reset-otp', verifyResetOTP)
router.post('/reset-password', resetPassword)

module.exports =router;
