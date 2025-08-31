
import { createUser, findUserByEmail } from '../services/userService.js';
import { validateUserInput } from '../validators/userValidator.js';
import { generateToken } from '../utils/token.js';
import bcrypt from 'bcryptjs';

export async function registerUser(req, res, next) {
  const error = validateUserInput(req.body);
  if (error) return res.status(400).json({ msg: error });
  try {
    const user = await createUser(req.body);
    const token = generateToken({ id: user._id });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
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
