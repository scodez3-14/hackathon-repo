import User from '../models/User.js';
export async function verifyEmailOtp(req, res, next) {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });
    if (user.isEmailVerified) return res.status(400).json({ msg: 'Email already verified' });
    if (user.emailVerificationOtp !== otp) return res.status(400).json({ msg: 'Invalid OTP' });
    if (user.emailVerificationExpires < new Date()) return res.status(400).json({ msg: 'OTP expired' });
    user.isEmailVerified = true;
    user.emailVerificationOtp = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();
    res.json({ msg: 'Email verified successfully' });
  } catch (err) {
    next(err);
  }
}

import { createUser, findUserByEmail } from '../services/userService.js';
import { validateUserInput } from '../validators/userValidator.js';
import { generateToken } from '../utils/token.js';
import { sendVerificationEmail } from '../utils/mailer.js';
import bcrypt from 'bcryptjs';

export async function registerUser(req, res, next) {
  const error = validateUserInput(req.body);
  if (error) return res.status(400).json({ msg: error });
  try {
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

    // Create user with OTP fields
    const userData = {
      ...req.body,
      isEmailVerified: false,
      emailVerificationOtp: otp,
      emailVerificationExpires: otpExpires,
    };
    const user = await createUser(userData);

    // Send verification email
    await sendVerificationEmail(user.email, otp);

    res.json({ msg: 'User registered. Verification email sent.', user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
}

export async function loginUser(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    const token = generateToken({ id: user._id });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
}
