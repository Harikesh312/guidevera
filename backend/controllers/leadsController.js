const nodemailer = require('nodemailer');

exports.submitLead = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

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
      to: 'contact@guidevera.com',
      subject: `New Lead – ${name}`,
      html: `
        <h2>New Lead Inquiry</h2>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse">
          <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
          <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${email || 'N/A'}</td></tr>
          <tr><td><strong>Message:</strong></td><td>${message}</td></tr>
        </table>
      `
    });

    // Confirmation email to student
    if (email) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: `We've received your inquiry! | Guidevera`,
        html: `
          <h2>Thank you for contacting Guidevera! 🎓</h2>
          <p>Hi ${name},</p>
          <p>We have successfully received your inquiry. Our expert counselors will call you shortly on <strong>${phone}</strong> to discuss your career and college options.</p>
          <p>For urgent queries, call us at <strong>+91 89794 85801</strong> or reply to this email.</p>
          <p>– Team Guidevera</p>
        `
      });
    }

    res.json({ success: true, message: "Enquiry submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to submit. Please try again.' });
  }
};
