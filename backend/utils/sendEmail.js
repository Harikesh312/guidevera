const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (toEmail, userName, verificationToken) => {
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

  await transporter.sendMail({
    from: `"Guidevera" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Verify Your Email – Guidevera',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 30px; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #0EB4A6; font-size: 28px; margin: 0;">Guidevera</h1>
          <p style="color: #666; margin: 5px 0;">Your True Guide for Career Clarity</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <h2 style="color: #333; margin-top: 0;">Hi ${userName}! 👋</h2>
          <p style="color: #555; line-height: 1.6;">
            Thank you for registering with Guidevera. To complete your account setup and start your career journey, please verify your email address.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" 
               style="background: #0EB4A6; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block;">
              ✅ Verify My Email
            </a>
          </div>
          
          <p style="color: #888; font-size: 13px; text-align: center;">
            This link expires in <strong>24 hours</strong>
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          
          <p style="color: #aaa; font-size: 12px; text-align: center;">
            If you didn't create an account, you can safely ignore this email.<br/>
            Or copy this link: <a href="${verificationLink}" style="color: #0EB4A6;">${verificationLink}</a>
          </p>
        </div>
        
        <p style="text-align: center; color: #bbb; font-size: 12px; margin-top: 20px;">
          © 2026 Guidevera. All rights reserved.
        </p>
      </div>
    `,
  });
};

const sendWelcomeEmail = async (toEmail, userName) => {
  await transporter.sendMail({
    from: `"Guidevera" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: '🎉 Welcome to Guidevera – You\'re Verified!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 30px; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #0EB4A6; font-size: 28px; margin: 0;">Guidevera</h1>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 8px;">
          <h2 style="color: #333;">Welcome aboard, ${userName}! 🎓</h2>
          <p style="color: #555; line-height: 1.6;">
            Your email has been verified successfully. You can now log in and start exploring top colleges, get personalized career roadmaps, and book your free counseling session.
          </p>
          <div style="text-align: center; margin: 25px 0;">
            <a href="${process.env.FRONTEND_URL}/login" 
               style="background: #0EB4A6; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
              Go to Login →
            </a>
          </div>
          <p style="color: #555;">Need help? Call us at <strong>+91 89794 85801</strong></p>
        </div>
      </div>
    `,
  });
};

module.exports = { sendVerificationEmail, sendWelcomeEmail };
