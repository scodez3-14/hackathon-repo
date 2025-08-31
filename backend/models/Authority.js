import mongoose from 'mongoose';

const authoritySchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const Authority = mongoose.model('Authority', authoritySchema);
export default Authority;
