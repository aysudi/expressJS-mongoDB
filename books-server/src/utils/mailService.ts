import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: config.GMAIL_USER,
    pass: config.GMAIL_PASS,
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
            .cta-button-container {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 12rem;
              margin: 20px auto;
              text-align: center;
            }
            .cta-button {
              background-color: #3498db;
              color: #fff;
              padding: 15px 25px;
              font-size: 18px;
              text-decoration: none;
              border-radius: 5px;
              text-align: center;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto;
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
            
            <div class="cta-button-container">
               <a href="${verificationLink}" target="_blank" class="cta-button">Verify Your Email</a>
            </div>
  
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
  verificationLink: any
) => {
  try {
    const htmlContent = generateHTML(name, verificationLink);

    const mailOptions = {
      from: `"Inkspire" <${config.GMAIL_USER}>`,
      to: recipientEmail,
      subject: "Email Verification",
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log("bye");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

export const sendUnlockAccountEmail = async (
  recipientEmail: string,
  name: string,
  unlockTime: any,
  unlockAccountLink: string
) => {
  try {
    const htmlContent = `
<html>
  <head>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f0f2f5;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
        overflow: hidden;
      }

      .header {
        background-color: #e74c3c;
        color: #ffffff;
        padding: 30px 20px;
        text-align: center;
      }

      .header h1 {
        margin: 0;
        font-size: 24px;
      }

      .content {
        padding: 30px 25px;
        color: #2c3e50;
        font-size: 16px;
        line-height: 1.6;
        text-align: center;
      }

      .info strong {
        color: #c0392b;
      }

      .cta-button-container {
        margin: 30px 0;
        text-align: center;
      }

      .cta-button {
        background-color: #3498db;
        color: #ffffff;
        text-decoration: none;
        padding: 14px 28px;
        border-radius: 6px;
        font-weight: bold;
        display: inline-block;
        transition: background-color 0.3s ease;
      }

      .cta-button:hover {
        background-color: #2980b9;
      }

      .footer {
        background-color: #f4f6f8;
        text-align: center;
        padding: 20px;
        font-size: 13px;
        color: #7f8c8d;
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
        <h1>Account Locked</h1>
      </div>

      <div class="content">
        <p>Hello <strong>${name}</strong>,</p>
        <p>Your account has been temporarily locked due to multiple failed login attempts.</p>
        <p>You’ll be able to log in again after: <strong>${unlockTime}</strong></p>
        <p>If this wasn’t you or you need immediate access, you can unlock your account using the button below:</p>

        <div class="cta-button-container">
          <a href="${unlockAccountLink}" class="cta-button">Unlock My Account</a>
        </div>
      </div>

      <div class="footer">
        <p>Need help? <a href="mailto:support@yourdomain.com">Contact Support</a></p>
        <p>&copy; ${new Date().getFullYear()} Inkspire. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;

    const mailOptions = {
      from: `"Inkspire Security" <${config.GMAIL_USER}>`,
      to: recipientEmail,
      subject: "Account Locked - Action Required",
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending unlock account email:", error);
  }
};

export default sendVerificationEmail;
