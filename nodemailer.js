const sgMail = require('@sendgrid/mail');

const {config} = require('./config')

console.log(config.mail.key)
sgMail.setApiKey(config.mail.key)

const sendMail = async ({ to, from, subject, html }) => {
        let mailOptions = {
                to,
                from: 'studio_kseven@mail.ru',
                subject,
                html
        }

        console.log({ to, from, subject, html })

        await sgMail.send(mailOptions)
}

exports.sendMail = sendMail