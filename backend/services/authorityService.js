// Example: Authority service for business logic
import Authority from '../models/Authority.js';
import bcrypt from 'bcryptjs';

export async function createAuthority({ username, password }) {
  const existing = await Authority.findOne({ username });
  if (existing) throw new Error('Authority already exists');
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const authority = new Authority({ username, password: hashedPassword });
  await authority.save();
  return authority;
}

export async function findAuthorityByUsername(username) {
  return Authority.findOne({ username });
}
