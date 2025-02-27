const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const passport = require('passport');

// Set up nodemailer transporter (example using Gmail; adjust for your service)
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Set these in your .env file
    pass: process.env.EMAIL_PASS,
  },
});

// Utility function to send verification email
const sendVerificationEmail = (user, verificationToken) => {
  const verificationUrl = `http://localhost:5000/api/auth/verify?token=${verificationToken}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Verify your email',
    text: `Please verify your email by clicking the following link: ${verificationUrl}`,
    html: `<p>Please verify your email by clicking the following link:</p><a href="${verificationUrl}">Verify Email</a>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending verification email:", error);
    } else {
      console.log("Verification email sent:", info.response);
    }
  });
};

// -----------------------------
// Traditional Email Sign Up
// -----------------------------
router.post('/signup', async (req, res) => {
  console.log('Signup route hit with data:', req.body);
  try {
    const { firstName, lastName, email, password, address, phone } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Generate a verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    console.log('Generated verification token:', verificationToken);
    
    // Create new user (isVerified false for email sign-ups)
    user = new User({ firstName, lastName, email, password, address, phone, isVerified: false, verificationToken });
    await user.save();
    console.log('User registered successfully:', user);
    
    // Send verification email
    sendVerificationEmail(user, verificationToken);
    
    return res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.' });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// -----------------------------
// Email Verification Endpoint
// -----------------------------
router.get('/verify', async (req, res) => {
  const { token } = req.query;
  console.log('Verifying token:', token);
  if (!token) return res.status(400).json({ message: 'Verification token is missing' });
  try {
    const user = await User.findOne({ verificationToken: token });
    console.log("User found during verification:", user);
    if (!user) return res.status(400).json({ message: 'Invalid verification token' });
    
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// -----------------------------
// Traditional Login Endpoint
// -----------------------------
router.post('/login', async (req, res) => {
  console.log('Login route hit with data:', req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // For email sign-ups, ensure user is verified
    if (!user.isVerified && !user.socialProvider) {
      return res.status(400).json({ message: 'Please verify your email before logging in.' });
    }
    
    // For traditional login, compare password if not a social user
    if (!user.socialProvider) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Password mismatch for user:', email);
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.isAdmin ? 'admin' : 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    console.log('User logged in successfully:', user.email);
    return res.status(200).json({
      token,
      user: { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// -----------------------------
// Social Login/Signup Endpoint (Generic)
// -----------------------------
// Expects provider, email, firstName, lastName, and socialId.
// For social logins, no email verification is required.
router.post('/social-login', async (req, res) => {
  console.log('Social login route hit with data:', req.body);
  try {
    const { provider, email, firstName, lastName, socialId } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      // Create new social user (skip email verification)
      user = new User({
        firstName,
        lastName,
        email,
        socialProvider: provider,
        socialId,
        isVerified: true,
      });
      await user.save();
      console.log('New social user created:', user.email);
    } else {
      console.log('Social user found:', user.email);
    }
    
    const token = jwt.sign(
      { id: user._id, role: user.isAdmin ? 'admin' : 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    return res.status(200).json({
      token,
      user: { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName },
    });
  } catch (error) {
    console.error('Social login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// -----------------------------
// Google Social Login Endpoints
// -----------------------------
router.get('/google', passport.authenticate('google', { session: false, scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, role: req.user.isAdmin ? 'admin' : 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.redirect(`/dashboard?token=${token}`);
  }
);

// -----------------------------
// Apple Social Login Endpoints
// -----------------------------
router.get('/apple', passport.authenticate('apple', { session: false, scope: ['name', 'email'] }));

router.get('/apple/callback',
  passport.authenticate('apple', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, role: req.user.isAdmin ? 'admin' : 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.redirect(`/dashboard?token=${token}`);
  }
);

// -----------------------------
// Yahoo Social Login Endpoints
// -----------------------------
// Yahoo's OAuth2 strategy expects 'consumerKey' and 'consumerSecret'
router.get('/yahoo', passport.authenticate('yahoo', { session: false, scope: ['profile', 'email'] }));

router.get('/yahoo/callback',
  passport.authenticate('yahoo', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, role: req.user.isAdmin ? 'admin' : 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.redirect(`/dashboard?token=${token}`);
  }
);

// -----------------------------
// Outlook Social Login Endpoints
// -----------------------------
// Note: Adjust the strategy name if needed (e.g., 'windowslive' or 'outlook')
router.get('/outlook', passport.authenticate('windowslive', { session: false, scope: ['wl.emails', 'wl.basic'] }));

router.get('/outlook/callback',
  passport.authenticate('windowslive', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, role: req.user.isAdmin ? 'admin' : 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.redirect(`/dashboard?token=${token}`);
  }
);

module.exports = router;
