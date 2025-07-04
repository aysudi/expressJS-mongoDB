import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const generateHTML = (name: string, verificationLink: string) => {
  return `
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f7fa;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 50px auto;
              background-color: #fff;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .header h1 {
              color: #3498db;
              font-size: 32px;
              margin-bottom: 10px;
            }
            .header p {
              color: #7f8c8d;
              font-size: 16px;
            }
            .cta-button {
              background-color: #3498db;
              color: #fff;
              padding: 15px 25px;
              font-size: 18px;
              text-decoration: none;
              border-radius: 5px;
              display: inline-block;
              text-align: center;
              margin-top: 20px auto 0;
            }
            .cta-button:hover {
              background-color: #2980b9;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 12px;
              color: #95a5a6;
            }
            .footer p {
              margin: 0;
            }
            .footer a {
              color: #3498db;
              text-decoration: none;
            }
            .footer a:hover {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome, ${name}!</h1>
              <p>We're excited to have you join us. Please verify your email address by clicking the button below.</p>
            </div>
            
            <a href="${verificationLink}" class="cta-button">Verify Your Email</a>
  
            <div class="footer">
              <p>If you didn't create an account, no worries! You can safely ignore this email.</p>
              <p>Thank you for choosing our platform!</p>
              <p>Have any questions? <a href="mailto:support@yourdomain.com">Contact Support</a></p>
            </div>
          </div>
        </body>
      </html>
    `;
};

const sendVerificationEmail = async (
  recipientEmail: string,
  name: string,
  verificationLink: string
) => {
  try {
    const htmlContent = generateHTML(name, verificationLink);

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: recipientEmail,
      subject: "Email Verification",
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully!");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

export default sendVerificationEmail;
