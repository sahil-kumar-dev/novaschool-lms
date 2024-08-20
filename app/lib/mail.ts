import { HtmlContext } from 'next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    // Configure your email service here
    // For example, using Gmail:
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

export async function sendOtp(to: string, otp:any) {
    const mailOptions = {
        from: 'NOVASCHOOL <noreply@novaschool.com>',
        to,
        subject: 'Your OTP for LMS Signup',
        text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
        html: otp,
    }

    await transporter.sendMail(mailOptions)
}