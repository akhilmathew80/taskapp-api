const sgMail = require('@sendgrid/mail')

//const sendGridAPIKey = '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'

sgMail.setApiKey(process.env.SENDGRID_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'akhilmathew80@gmail.com',
        subject: 'Welcome to my Task App',
        text: `Welcome to the new application ${name}. Thanks for joining!`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'akhilmathew80@gmail.com',
        subject: 'Cancellation email',
        text: `Sorry to see you go! Come back soon ${name}`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}