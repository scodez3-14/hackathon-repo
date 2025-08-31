
import { createAuthority, findAuthorityByUsername } from '../services/authorityService.js';
import { validateAuthorityInput } from '../validators/authorityValidator.js';
import { generateToken } from '../utils/token.js';
import bcrypt from 'bcryptjs';

export async function registerAuthority(req, res, next) {
  const error = validateAuthorityInput(req.body);
  if (error) return res.status(400).json({ msg: error });
  try {
    const authority = await createAuthority(req.body);
    const token = generateToken({ id: authority._id, role: 'authority' });
    res.json({ token, authority: { id: authority._id, username: authority.username } });
  } catch (err) {
    next(err);
  }
}

export async function loginAuthority(req, res, next) {
  const { username, password } = req.body;
  try {
    const authority = await findAuthorityByUsername(username);
    if (!authority) return res.status(400).json({ msg: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, authority.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    const token = generateToken({ id: authority._id, role: 'authority' });
    res.json({ token, authority: { id: authority._id, username: authority.username } });
  } catch (err) {
    next(err);
  }
}
