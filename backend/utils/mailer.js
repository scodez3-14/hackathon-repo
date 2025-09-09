import nodemailer from 'nodemailer';

export async function sendVerificationEmail(email, otp) {
  // Configure your SMTP transport (use environment variables for credentials)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your email',
    text: `Your verification code is: ${otp}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.response);
  } catch (err) {
    console.error('Error sending verification email:', err);
    throw err;
  }
}
