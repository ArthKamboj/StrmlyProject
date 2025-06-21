const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [30, 'Name must be under 30 characters'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    validate: {
      validator: function (v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v)
      },
      message: 'Password must contain uppercase, lowercase letters and digits'
    }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  otp: String,
  otpExpiresAt: Date
})

module.exports = mongoose.model('User', userSchema)