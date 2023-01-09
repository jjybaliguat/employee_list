import nodemailer from 'nodemailer'

export const sendEmail = async (subject, message, send_to, send_from, reply_to) => {
    //create email transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    //Option for sending email
    const options = {
        from: send_from,
        to: send_to,
        replyTo: reply_to,
        subject: subject,
        html: message
    }

    //send email
    transporter.sendMail(options, function (err, info) {
        if(err){
            console.log(err)
        }else{
            console.log(info)
        }
    })
}