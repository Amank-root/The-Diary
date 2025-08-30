import { Session } from "@/lib/auth";
import VerificationEmailTemplate from "@/email/mail/verification-template"
import nodemailer from 'nodemailer';
import { render } from '@react-email/components';


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: "rexpaul853@gmail.com",
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN_GOOGLE_OAUTH2,
  },
});

type User = Session['user'];

export const sendEmail = async (url: string, user: User) => {
    const renderEmailComp = await render(VerificationEmailTemplate({ url, name: user.name }));
    const mailOptions = {
        from: 'rexpaul853@gmail.com',
        to: user.email,
        subject: 'Verify your email',
        html: renderEmailComp,
    };

    await transporter.sendMail(mailOptions);
}