const envConfig = require("../config/env-config")
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: envConfig.EMAIL_USER,
    clientId: envConfig.CLIENT_ID,
    clientSecret: envConfig.CLIENT_SECRET,
    refreshToken: envConfig.REFRESH_TOKEN,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"E-Commerce App" <${envConfig.EMAIL_USER}>`, // sender address
      to,
      subject,
      text,
      html,
    });
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports.callSendEmail = async (email, otp) => {
  const to = email;
  const subject = "Email Verification";
  const text = `Your OTP for email verification is: ${otp}. This OTP will expire in 10 minutes. If you did not request this, please ignore this email.`;
  const html = `
        <div style="font-family: Arial, sans-serif;">
            <h2>Email Verification</h2>
            <p>Your OTP for email verification is:</p>
            <h1 style="letter-spacing: 5px;">${otp}</h1>
            <p>This OTP will expire in 10 minutes.</p>
            <p>If you did not request this, please ignore this email.</p>
        </div>
        `;
  return await sendEmail(to, subject, text, html);
};
