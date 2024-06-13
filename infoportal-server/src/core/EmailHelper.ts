import nodemailer = require('nodemailer')
import dotenv from 'dotenv'

dotenv.config()
const sendEmail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ukr.net',
    port: 465,
    secure: true,
    auth: {
      user: process.env.UKR_NET_EMAIL,
      pass: process.env.UKR_NET_PASSWORD,
    },
  })

  const mailOptions = {
    from: process.env.UKR_NET_EMAIL,
    to,
    subject,
    text,
  }

  return transporter.sendMail(mailOptions)
}

export default sendEmail