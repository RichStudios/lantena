const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session'); // Added for session support

dotenv.config();

const app = express();

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors());

// Add session middleware so that Passport can store temporary OAuth tokens
app.use(session({
  secret: process.env.JWT_SECRET, // You can use your JWT secret or another secret
  resave: false,
  saveUninitialized: true,
}));

// Initialize Passport
const passport = require('./config/passport');
app.use(passport.initialize());
app.use(passport.session()); // Enable Passport session support

// Import authentication routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Root route for testing
app.get('/', (req, res) => {
  console.log('Root endpoint hit');
  res.send('API is running...');
});

// Connect to MongoDB using the URI from your .env file
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
