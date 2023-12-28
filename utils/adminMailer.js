import nodemailer from 'nodemailer';

export const sendEmail = async (message)=>{
    try {
        var transport = nodemailer.createTransport({
            pool: true,
            service: 'hotmail',
            port: 2525,
            auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD,
            },
            maxConnections: 1
          });
        const mailOptions ={
            from:process.env.EMAIL_USERNAME,
            to:'dattebaayo234@gmail.com',
            subject:message.subject,
            html:message.body
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error) {
        console.log(error.message)
    }
}