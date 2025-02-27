const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, unique: true, required: true },
  password:  { type: String },  // may be absent for social users
  address:   { type: String },
  phone:     { type: String },
  isAdmin:   { type: Boolean, default: false },
  isVerified:{ type: Boolean, default: false },
  verificationToken: { type: String },
  // For social login
  socialProvider: { type: String },
  socialId:       { type: String },
}, { timestamps: true });

// Hash password before saving if modified and if password exists
UserSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
