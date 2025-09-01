// Profile controller: update and get user profile after login
import User from '../models/User.js';

export async function updateProfile(req, res, next) {
  try {
    const userId = req.user.id;
    const updateData = req.body;
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function getProfile(req, res, next) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
}
