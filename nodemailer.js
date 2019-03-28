const sgMail = require('@sendgrid/mail');

const {config} = require('./config')

sgMail.setApiKey(config.mail.key)

const sendMail = async ({ to, from, subject, html }) => {
        let mailOptions = {
                to,
                from: 'vladislavbilling@gmail.com',
                subject,
                html
        }

        await sgMail.send(mailOptions)
}

exports.sendMail = sendMail