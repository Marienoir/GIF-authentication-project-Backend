import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import logger from '../config/logger';
import jwt_decode from "jwt-decode";
import { generateResetCode } from './index';
import { updateResetCode } from '../services';

dotenv.config();

export const sendResetPasswordLink = async (email, token) => {;
  let decoded = jwt_decode(token);
  const reset_code = generateResetCode();
  await updateResetCode(reset_code, email);
  
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GIF_API_EMAIL,
      pass: process.env.GIF_API_PASSWORD,
    },
  });

  let mailOptions = {
    from: 'GIFFY AUTHENTICATION TEAM',
    to: `${email}`,
    subject: "Reset Your Password",
    html: `<p>Hello ${decoded.name},</p><br>
            <p> You have requested for a password reset.
            To reset your password successfully, enter the code below on the reset password page
            <h2><b>${reset_code}</b><h2>
            </p>
            <p>This code will expire one hour after this email was sent.
            If you did not make this request, please disregard this email.</p>
            <br>
            Kind regards, <br>
            <h4> Giffy Authentication Support </h4>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.info("email error application", error.message);
    } else {
      logger.info("Email sent: " + info.response);
    }
  });
};
