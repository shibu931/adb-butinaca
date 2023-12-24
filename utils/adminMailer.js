import nodemailer from 'nodemailer';

export const sendEmail = async (message)=>{
    try {
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILTRAP_USERNAME,
              pass: process.env.MAILTRAP_PASSWORD
            }
          });
        const mailOptions ={
            from:'dattebaayo234@gmail.com',
            to:process.env.ADMIN_MAIL,
            subject:message.subject,
            html:message.body
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error) {
        console.log(error.message)
    }
}