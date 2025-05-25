import nodemailer from 'nodemailer'
import { emailTemplate } from './emailTemplate.js'
import dotenv from 'dotenv'
dotenv.config({path:'./config/.env'})
const transporter = nodemailer.createTransport({
    host : 'smtp.gmail.com',
    port : process.env.SMTP_PORT,
    secure : process.env.SMTP_PORT == 465,
    auth:{
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS,
    }
})

export const sendEmail = async ({email,otp,category}) =>{
    try {
        const info = await transporter.sendMail({
            from : `Your company ${process.env.EMAIL_USER}`,
            to : email,
            subject : `Your ${category} Verification OTP`,
            html : emailTemplate(otp,category)
        })
        console.log(`Email send succesfully MessageID ${info.messageId}`)
        
    } catch (error) {
        console.log("sendEmail error",error)
    }
}