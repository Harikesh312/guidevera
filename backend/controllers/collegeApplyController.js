const nodemailer = require('nodemailer');

exports.applyToCollege = async (req, res) => {
  try {
    const { name, phone, email, course, state, collegeName } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email to Guidevera team
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'guidevera26@gmail.com',
      subject: `New College Application – ${name} → ${collegeName}`,
      html: `
        <h2>New College Application Inquiry</h2>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse">
          <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
          <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
          <tr><td><strong>Interested Course:</strong></td><td>${course}</td></tr>
          <tr><td><strong>State:</strong></td><td>${state}</td></tr>
          <tr><td><strong>College:</strong></td><td>${collegeName}</td></tr>
        </table>
      `
    });

    // Confirmation email to student
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Application Received – ${collegeName} | Guidevera`,
      html: `
        <h2>Application Received! 🎓</h2>
        <p>Hi ${name},</p>
        <p>Thank you for your interest in <strong>${collegeName}</strong>. Our admissions team will call you within 24 hours to discuss <strong>${course}</strong>.</p>
        <p><strong>Your Details:</strong></p>
        <ul>
          <li>College: ${collegeName}</li>
          <li>Course: ${course}</li>
          <li>Phone: ${phone}</li>
        </ul>
        <p>For urgent queries, call us at <strong>+91 89794 85801</strong> or reply to this email.</p>
        <p>– Team Guidevera</p>
      `
    });

    res.json({ success: true, message: "We'll contact you within 24 hours!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to submit. Please try again.' });
  }
};
