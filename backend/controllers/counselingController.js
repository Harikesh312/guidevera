const nodemailer = require('nodemailer');

exports.bookCounseling = async (req, res) => {
  try {
    const { name, email, phone, city, qualification, stream, preferredDate, preferredTime } = req.body;

    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email to Guidevera team
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'contact@guidevera.com',
      subject: `New Counseling Booking – ${name}`,
      html: `
        <h2>New Counseling Session Booking</h2>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse">
          <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
          <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
          <tr><td><strong>City:</strong></td><td>${city}</td></tr>
          <tr><td><strong>Qualification:</strong></td><td>${qualification}</td></tr>
          <tr><td><strong>Stream/Interest:</strong></td><td>${stream}</td></tr>
          <tr><td><strong>Preferred Date:</strong></td><td>${preferredDate}</td></tr>
          <tr><td><strong>Preferred Time:</strong></td><td>${preferredTime}</td></tr>
        </table>
      `
    });

    // Confirmation email to student
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Booking Confirmed – Guidevera Counseling Session',
      html: `
        <h2>Your Session is Booked! 🎉</h2>
        <p>Hi ${name},</p>
        <p>Your career counseling session has been successfully booked. Our team will contact you within 24 hours to confirm the details.</p>
        <p><strong>Session Details:</strong></p>
        <ul>
          <li>Date: ${preferredDate}</li>
          <li>Time: ${preferredTime}</li>
        </ul>
        <p>For queries, reply to this email or call us directly.</p>
        <p>– Team Guidevera</p>
      `
    });

    res.json({ success: true, message: 'Booking confirmed. Check your email!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Booking failed. Please try again.' });
  }
};
