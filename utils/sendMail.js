const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  secure: true,
  host: 'smtp.hostinger.com',
  port: 465,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const sendMail = async (email, subject, text) => {
  const mailOptions = {
    from: `"Media2AI" <${process.env.NODEMAILER_EMAIL}>`,
    to: email,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;