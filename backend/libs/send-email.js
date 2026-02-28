import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_GMAIL,
    pass: process.env.MY_PASSWORD,
  },
});

export const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: process.env.MY_GMAIL,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    return true;
  } catch (error) {
    console.error("Error sending email:", error);

    return false;
  }
};
