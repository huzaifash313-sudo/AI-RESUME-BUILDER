import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Resume from "../models/Resume.model.js";
import crypto from 'crypto'
import nodemailer from 'nodemailer'

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Missing required fields");
  }

  const user = await User.findOne({ email });
  if (user) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken(newUser._id);
  newUser.password = undefined;

  return res.status(201).json(
    new ApiResponse(201, {
      message: "User created successfully",
      token,
      user: newUser
    })
  );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log('=== LOGIN START ===');
  console.log('Email:', email);
  
  const user = await User.findOne({ email });
  console.log('User found:', !!user);
  if (!user) {
    throw new ApiError(400, "Invalid email or password");
  }
  
  const passwordMatch = user.comparePassword(password);
  console.log('Password match:', passwordMatch);
  console.log('Password from client:', password ? 'present' : 'missing');
  console.log('Stored hash present:', !!user.password);
  
  if(!passwordMatch) {
    throw new ApiError(400, "Invalid email or password") 
  }
  console.log('Login successful for:', email);
  console.log('=== LOGIN END ===');
  
  const token = generateToken(user._id);
  user.password = undefined;

  return res.status(200).json(
    new ApiResponse(200, {
      message: "Login successful",
      token,
      user
    })
  );
});


export const getUserById = asyncHandler(async(req, res) => {
    const userId = req.userId;

    const user = await User.findById(userId)
    if(!user) {
        throw new ApiError(400, "User not found")
    }
    user.password = undefined;
    return res.status(200).json(
        new ApiResponse(200, {user})
    )
})

export const getUserResumes = asyncHandler(async(req, res) => {
    const userId = req.userId;

    const resumes = await Resume.find({userId})
    if (!resumes.length) {
  throw new ApiError(404, "No resumes found");
}
    return res.status(200).json(
        new ApiResponse(200, {resumes})
    )
})

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log('=== FORGOT PASSWORD START ===');
  console.log('Email received:', email);
  if (!email) throw new ApiError(400, 'Email is required');

  const user = await User.findOne({ email });
  console.log('User found:', !!user);
  if (!user) throw new ApiError(404, 'User not found');

  // generate token
  const token = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();
  console.log('Token saved for user:', email);

  const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
  console.log('Reset URL:', resetUrl);

  // Try to send email if SMTP configured, otherwise return link in response for dev testing
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST;
  console.log('SMTP configured?', !!(smtpHost && smtpUser && smtpPass));

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user: smtpUser, pass: smtpPass }
      });

      const mailOptions = {
        from: process.env.SMTP_FROM || smtpUser,
        to: user.email,
        subject: 'Password reset request',
        text: `You requested a password reset. Use the following link to reset your password: ${resetUrl}`,
        html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`
      };

      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully to:', user.email);
      return res.status(200).json(new ApiResponse(200, { message: 'Reset email sent' }, 'Reset email sent'));
    } catch (mailErr) {
      console.error('Email send error:', mailErr);
      // Fall through to return resetUrl for dev testing
    }
  }

  // no SMTP or email failed: return the link so developer can test
  console.log('=== FORGOT PASSWORD END (returning resetUrl) ===');
  return res.status(200).json(new ApiResponse(200, { resetUrl, message: 'No SMTP configured - returned resetUrl for testing' }, 'Reset link'));
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, email, password } = req.body;
  if (!token || !email || !password) throw new ApiError(400, 'Token, email and new password are required');

  const user = await User.findOne({ email, resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
  if (!user) throw new ApiError(400, 'Invalid or expired token');

  // update password
  const hashed = await bcrypt.hash(password, 10);
  user.password = hashed;
  user.resetPasswordToken = '';
  user.resetPasswordExpires = undefined;
  await user.save();

  return res.status(200).json(new ApiResponse(200, { message: 'Password reset successful' }, 'Password reset successful'));
});