import dotenv from "dotenv"
import nodemailer, { Transporter } from "nodemailer"

dotenv.config();

export const transporter:Transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:process.env.GOOGLE_EMAIL,
        pass:process.env.GOOGLE_APP_PASS
    }
})
        