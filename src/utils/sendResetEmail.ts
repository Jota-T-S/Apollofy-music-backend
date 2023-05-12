import { Response } from "express";
import nodemailer from 'nodemailer';



export const sendResetEmail = (_id: string, _email: string, url: string, res: Response) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.NODEMAILER_PASS,
        },
    })

    const resetString = _id + _id;
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: "rubenreamps@gmail.com", 
        subject: 'Reset Password',
        html: `<h1>Click the link below to reset your password</h1>
                <p>This link <b>expires in 30 minutes:</b></p>
                <p>Press <a href=${url}/reset/${_id}/${resetString}>here</a> to reset your password</p>
                `
    }

    transporter.sendMail(mailOptions) 
        .then(() =>{
            res.status(200).json({message: 'Email sent'})
            console.log('Email sent')
        
        })
        .catch(error =>{
            console.log(error)
            res.status(500).json(error)
        })
}