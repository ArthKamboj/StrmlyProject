const nodemailer = require('nodemailer')
const sendOTP = async (email, otp) => {
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
})
    const mailOptions = {
    from: '"STREAMSITE" <no-reply@strmly.com>',
    to: email,
    subject: 'Your OTP Code',
    html: `<p>Your OTP is <strong>${otp}</strong>. It expires in 10 minutes.</p>`
  }

  await transporter.sendMail(mailOptions);
}

module.exports = sendOTP