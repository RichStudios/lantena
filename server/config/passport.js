const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const AppleStrategy = require('passport-apple').Strategy;
const YahooStrategy = require('passport-yahoo-oauth2').Strategy;
const OutlookStrategy = require('passport-outlook').Strategy;
const User = require('../models/User');

// Log Yahoo credentials for debugging (remove in production)
console.log("Yahoo Consumer Key:", process.env.YAHOO_CLIENT_ID);
console.log("Yahoo Consumer Secret:", process.env.YAHOO_CLIENT_SECRET);

// -------------------
// Google Strategy
// -------------------
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      let user = await User.findOne({ email });
      if (!user) {
        user = new User({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email,
          socialProvider: 'google',
          socialId: profile.id,
          isVerified: true
        });
        await user.save();
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// -------------------
// Apple Strategy
// -------------------
passport.use(new AppleStrategy(
  {
    clientID: process.env.APPLE_CLIENT_ID,
    teamID: process.env.APPLE_TEAM_ID,
    keyID: process.env.APPLE_KEY_ID,
    // Use either privateKey or privateKeyLocation depending on your setup:
    privateKeyLocation: process.env.APPLE_PRIVATE_KEY_PATH,
    callbackURL: "/api/auth/apple/callback"
  },
  async (accessToken, refreshToken, idToken, profile, done) => {
    try {
      const email = idToken.email;
      let user = await User.findOne({ email });
      if (!user) {
        user = new User({
          firstName: profile?.name?.givenName || '',
          lastName: profile?.name?.familyName || '',
          email,
          socialProvider: 'apple',
          socialId: idToken.sub,
          isVerified: true
        });
        await user.save();
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// -------------------
// Yahoo Strategy
// -------------------
// Use consumerKey and consumerSecret as required.
passport.use(new YahooStrategy(
  {
    consumerKey: process.env.YAHOO_CLIENT_ID,         // Make sure this value is defined in .env
    consumerSecret: process.env.YAHOO_CLIENT_SECRET,    // Make sure this value is defined in .env
    callbackURL: "/api/auth/yahoo/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
      if (!email) {
        return done(new Error("No email provided by Yahoo"), null);
      }
      let user = await User.findOne({ email });
      if (!user) {
        user = new User({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email,
          socialProvider: 'yahoo',
          socialId: profile.id,
          isVerified: true
        });
        await user.save();
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// -------------------
// Outlook Strategy
// -------------------
passport.use(new OutlookStrategy(
  {
    clientID: process.env.OUTLOOK_CLIENT_ID,
    clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
    callbackURL: "/api/auth/outlook/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
      if (!email) {
        return done(new Error("No email returned from Outlook"), null);
      }
      let user = await User.findOne({ email });
      if (!user) {
        const names = profile.displayName ? profile.displayName.split(" ") : [];
        user = new User({
          firstName: names[0] || '',
          lastName: names.slice(1).join(" ") || '',
          email,
          socialProvider: 'outlook',
          socialId: profile.id,
          isVerified: true
        });
        await user.save();
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// -------------------
// Session Serialization (if using sessions)
// -------------------
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
