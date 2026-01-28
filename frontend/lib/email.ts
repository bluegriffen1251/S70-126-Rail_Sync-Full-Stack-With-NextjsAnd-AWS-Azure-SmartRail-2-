import nodemailer from "nodemailer";

// 1. Create the Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

// 2. Reusable Send Function
export const sendEmail = async (data: EmailPayload) => {
  const mailOptions = {
    from: `"Rail Sync App" <${process.env.SMTP_USER}>`, // Sender address
    to: data.to,
    subject: data.subject,
    html: data.html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Nodemailer Error:", error);
    throw new Error("Failed to send email via Nodemailer");
  }
};  