// Update contact details
export async function updateContactDetails(req, res, next) {
  try {
    const userId = req.user.id;
    const { contactDetails } = req.body;
    const user = await User.findByIdAndUpdate(userId, { contactDetails }, { new: true });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

// Update education
export async function updateEducation(req, res, next) {
  try {
    const userId = req.user.id;
    const { education } = req.body;
    const user = await User.findByIdAndUpdate(userId, { education }, { new: true });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

// Update skills, interests, githubLink, certifications, otherDetails
export async function updateSkills(req, res, next) {
  try {
    const userId = req.user.id;
    const { skills, interests, githubLink, certifications, otherDetails } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { skills, interests, githubLink, certifications, otherDetails },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    next(err);
  }
}
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
