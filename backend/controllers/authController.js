const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendVerificationEmail, sendWelcomeEmail } = require('../utils/sendEmail');

// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists. Please login.' });
    }

    // Create user
    user = new User({
      name,
      email,
      password,
      role: role || 'student',
      isVerified: true, // Automatically verify
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({
      msg: 'Registration successful! You can now login.'
    });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ msg: 'Server error. Please try again.' });
  }
};

// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials.' });
    }

    const payload = { user: { id: user.id, role: user.role } };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
      });
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ msg: 'Server error. Please try again.' });
  }
};

// @route   GET /api/auth/verify-email?token=xxx
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ msg: 'Verification token is missing.' });
    }

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() }, // token not expired
    });

    if (!user) {
      return res.status(400).json({
        msg: 'Invalid or expired verification link. Please register again or request a new link.'
      });
    }

    // Mark as verified and clear token
    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiry = null;
    await user.save();

    // Send welcome email
    await sendWelcomeEmail(user.email, user.name);

    res.json({ msg: 'Email verified successfully! You can now login.', success: true });
  } catch (err) {
    console.error('Verify email error:', err.message);
    res.status(500).json({ msg: 'Server error. Please try again.' });
  }
};

// @route   POST /api/auth/resend-verification
exports.resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'No account found with this email.' });
    }

    if (user.isVerified) {
      return res.status(400).json({ msg: 'This email is already verified. Please login.' });
    }

    // Generate new token
    const token = crypto.randomBytes(32).toString('hex');
    user.verificationToken = token;
    user.verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    await sendVerificationEmail(email, user.name, token);

    res.json({ msg: 'Verification email resent! Please check your inbox.' });
  } catch (err) {
    console.error('Resend verification error:', err.message);
    res.status(500).json({ msg: 'Server error. Please try again.' });
  }
};

// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    res.json({ msg: 'Auth middleware needed for this route' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
