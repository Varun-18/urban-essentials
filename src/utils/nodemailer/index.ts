import dotenv from 'dotenv';
import nodemailer, { Transporter } from 'nodemailer';

type emailOptions = {
  to: string;
  subject: string;
  html?: string;
};

dotenv.config();

const transporter: Transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_APP_PASS,
  },
});

export const sendEmail = (options: emailOptions) => {
  transporter.sendMail({ ...options });
};
