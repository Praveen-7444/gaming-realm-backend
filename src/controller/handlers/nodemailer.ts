const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS,
    },
});

async function sendResetOtpEmail(userMail: string, user) {
    const mailOptions = {
        from: process.env.MAIL_ID,
        to: userMail,
        subject: 'OTP to Reset password',
        text: `Your OTP for password reset is: ${user.resetOtp}. 
        Do not share your OTP with anyone else. Validity 5 Mins`,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP email sent to:', userMail);
    } catch (error) {
        console.error('Error sending OTP email:', error);
    }
}
