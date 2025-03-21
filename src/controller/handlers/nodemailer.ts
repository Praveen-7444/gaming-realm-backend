const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS,
    },
});

export async function sendResetOtpEmail(userMail: string, otp: number) {
    const mailOptions = {
        from: process.env.MAIL_ID,
        to: userMail,
        subject: 'OTP to Reset password',
        text: `Your OTP for password reset is: ${otp}. 
        Do not share your OTP with anyone else. Validity 5 Mins`,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP email sent to:', userMail);
    } catch (error) {
        console.error('Error sending OTP email:', error);
    }
}

export async function sendRandomPasswordEmail(userMail: string, password: string) {
    const mailOptions = {
        from: process.env.MAIL_ID,
        to: userMail,
        subject: 'Random Password',
        text: `Your random password is: ${password}. 
        Do not share your password with anyone else. Validity 5 Mins`,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Random password email sent to:', userMail);
    } catch (error) {
        console.error('Error sending random password email:', error);
    }
}