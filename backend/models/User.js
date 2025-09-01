import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  houseNumber: String,
  addressLine1: String,
  addressLine2: String,
  village: String,
  zip: String,
  district: String,
  state: String,
}, { _id: false });

const educationSchema = new mongoose.Schema({
  qualification: String,
  course: String,
  stream: String,
  board: String,
  institute: String,
  marks: String,
  yearOfPassing: String,
  certificateUrl: String,
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Optional profile fields for post-login update
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  dob: String,
  guardianName: String,
  category: String,

  permanentAddress: addressSchema,
  currentAddress: addressSchema,
  isPermanentSameAsCurrent: Boolean,
  differentlyAbled: Boolean,

  registeredMobile: String,
  alternateMobile: String,
  mobileBelongsToUser: Boolean,
  mobileOwnerName: String,
  relationWithOwner: String,
  otp: String,

  education: [educationSchema],
  skills: [String],
  languages: [String],
  profileCompleted: { type: Boolean, default: false },

  // Email verification fields
  isEmailVerified: { type: Boolean, default: false },
  emailVerificationOtp: String,
  emailVerificationExpires: Date,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
