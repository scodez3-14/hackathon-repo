import express from 'express';
const router = express.Router();
import { authenticateJWT } from '../middleware/auth.js';
import { updateProfile, getProfile, updateContactDetails, updateEducation, updateSkills } from '../controllers/profileController.js';
import upload from '../middleware/multer.js';
// Upload education certificate (single file)
router.post('/profile/education/certificate', authenticateJWT, upload.single('certificate'), async (req, res, next) => {
	try {
		// File is available as req.file
		// Optionally, update the user's education array with the certificate URL
		const userId = req.user.id;
		const { educationIndex } = req.body; // Index of the education entry to update
		if (!req.file) {
			return res.status(400).json({ error: 'No file uploaded' });
		}
		const certificateUrl = `/uploads/certificates/${req.file.filename}`;
		// Update the certificateUrl for the specified education entry
		const user = await (await import('../models/User.js')).default.findById(userId);
		if (!user) return res.status(404).json({ error: 'User not found' });
		if (!user.education || !user.education[educationIndex]) {
			return res.status(400).json({ error: 'Invalid education index' });
		}
		user.education[educationIndex].certificateUrl = certificateUrl;
		await user.save();
		res.json({ success: true, certificateUrl });
	} catch (err) {
		next(err);
	}
});
// Profile section update routes (require login)
router.put('/profile/contact', authenticateJWT, updateContactDetails);
router.put('/profile/education', authenticateJWT, updateEducation);
router.put('/profile/skills', authenticateJWT, updateSkills);
import { registerUser, loginUser, verifyEmailOtp } from '../controllers/userController.js';
import { registerAuthority, loginAuthority } from '../controllers/authorityController.js';

// Email verification route
router.post('/verify-email', verifyEmailOtp);

// Profile routes (require login)
router.get('/profile', authenticateJWT, getProfile);
router.put('/profile', authenticateJWT, updateProfile);

// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Authority routes
router.post('/authority/register', registerAuthority);
router.post('/authority-login', loginAuthority);

export default router;
