const {config} = require('./config')

'use strict'
const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
const sendMail = async ({ to, from, subject, html }) => {

	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	// let account = await nodemailer.createTestAccount()

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true, // true for 465, false for other ports
		auth: {
			user: config.mail.user, // generated ethereal user
			pass: config.mail.pass // generated ethereal password
		}
	})

	// setup email data with unicode symbols
	let mailOptions = {
		from,
		to,
		subject,
		html
	}

	// send mail with defined transport object
	let info = await transporter.sendMail(mailOptions)

	console.log('Message sent: %s', info.messageId)
	// Preview only available when sending through an Ethereal account
	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))

	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

exports.sendMail = sendMail