// Example: User service for business logic
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export async function createUser(userData) {
  const { name, email, password, ...rest } = userData;
  const existing = await User.findOne({ email });
  if (existing) throw new Error('User already exists');
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({ name, email, password: hashedPassword, ...rest });
  await user.save();
  return user;
}

export async function findUserByEmail(email) {
  return User.findOne({ email });
}
