const rateLimit = require('express-rate-limit')
const authLimiter = rateLimit({
    windowMs: 10*60*1000,
    max: 5,
    message: {
    error: 'Too many requests. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
})

module.exports = {authLimiter}