import 'server-only'
import { Session } from "@/lib/auth";
import VerificationEmailTemplate from "@/email/mail/verification-template"
import nodemailer from 'nodemailer';
import { render } from '@react-email/components';
import ResetPassword from "./mail/reset-password-template";


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    // type: "OAuth2",
    user: process.env.SMTP_USER,
    pass: process.env.GOOGLE_APP_PASSWORD,
    // clientId: process.env.GOOGLE_CLIENT_ID,
    // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // refreshToken: process.env.REFRESH_TOKEN_GOOGLE_OAUTH2,
  },
});

type User = Session['user'];

export const sendEmail = async (url: string, user: User) => {
    const renderEmailComp = await render(VerificationEmailTemplate({ url, name: user.name }));
    const mailOptions = {
        from: `Rex from The Diary <${process.env.SMTP_USER}>`,
        to: user.email,
        subject: 'Verify your email',
        html: renderEmailComp,
    };

    await transporter.sendMail(mailOptions);
}

export const resetPassword = async (url: string, user: User) => {
  const renderEmailComp = await render(ResetPassword({ resetLink:url, name: user.name, userEmail: user.email }));
  const mailOptions = {
      from: `Rex from The Diary <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: 'Reset your password',
      html: renderEmailComp,
  };

  await transporter.sendMail(mailOptions);
}