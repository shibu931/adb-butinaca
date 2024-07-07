import nodemailer from 'nodemailer';

export const sendEmail = async ({email,emailType,userId})=>{
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
            from:'',
            to:email,
            subject:emailType ==="VERIFY" ? "Verify your email":"Verify your password",
            html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" >here</a> to ${emailType ==="VERIFY" ? "Verify your email":"Verify your password"} </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error) {
        console.log(error.message)
    }
}