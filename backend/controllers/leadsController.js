const nodemailer = require('nodemailer');

exports.submitLead = async (req, res) => {
  try {
    const { name, phone, email, qualification, stream, college, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const row = (label, value) =>
      value
        ? `<tr>
            <td style="padding:10px 14px; font-weight:bold; background:#f5f5f5; white-space:nowrap; border:1px solid #ddd;">${label}</td>
            <td style="padding:10px 14px; border:1px solid #ddd;">${value}</td>
           </tr>`
        : '';

    // Email to Guidevera team
    await transporter.sendMail({
      from: `"Guidevera Leads" <${process.env.EMAIL_USER}>`,
      to: 'guidevera26@gmail.com',
      subject: `🎓 New Lead – ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 24px; border-radius: 10px;">
          <h2 style="color: #0EB4A6; margin-bottom: 4px;">New Lead Inquiry</h2>
          <p style="color: #888; margin-top: 0; margin-bottom: 20px; font-size: 13px;">Submitted via Guidevera Landing Page</p>
          <table style="width:100%; border-collapse:collapse; font-size:15px;">
            ${row('Name', name)}
            ${row('Phone', phone)}
            ${row('Email', email || 'N/A')}
            ${row('Qualification', qualification || 'N/A')}
            ${row('Stream / Interest', stream || 'N/A')}
            ${row('Preferred College', college || 'N/A')}
            ${row('Note / Message', message || '—')}
          </table>
          <p style="margin-top:20px; font-size:12px; color:#aaa;">© 2026 Guidevera. All rights reserved.</p>
        </div>
      `
    });

    // Confirmation email to student
    if (email) {
      await transporter.sendMail({
        from: `"Guidevera" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `We've received your inquiry! | Guidevera`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 24px; border-radius: 10px;">
            <h2 style="color: #0EB4A6;">Thank you for contacting Guidevera! 🎓</h2>
            <p>Hi <strong>${name}</strong>,</p>
            <p>We have successfully received your inquiry. Our expert counselors will call you shortly on <strong>${phone}</strong> to discuss your career and college options.</p>
            <p>For urgent queries, call us at <strong>+91 89794 85801</strong> or reply to this email.</p>
            <p>– Team Guidevera</p>
            <p style="font-size:12px; color:#aaa;">© 2026 Guidevera. All rights reserved.</p>
          </div>
        `
      });
    }

    res.json({ success: true, message: "Enquiry submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to submit. Please try again.' });
  }
};
