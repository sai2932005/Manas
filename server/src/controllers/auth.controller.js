import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from '../utils/asyncHandler.js';

// Shared cookie options - used by login, register, and cleared on logout
const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: Number(process.env.COOKIE_EXPIRES_IN_DAYS) * 24 * 60 * 60 * 1000,
});

// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error('User already exists with this email');
  }

  const user = await User.create({ name, email, password });

  const token = generateToken(user._id);
  console.log('DEBUG maxAge value:', process.env.COOKIE_EXPIRES_IN_DAYS, typeof process.env.COOKIE_EXPIRES_IN_DAYS);
  res.cookie('token', token, getCookieOptions());

  res.status(201).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Explicitly select password since schema excludes it by default
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user._id);
  res.cookie('token', token, getCookieOptions());

  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
    res.cookie('token', '', {
    ...getCookieOptions(),
    maxAge: 0,
  });
  

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  // req.user was attached by the protect middleware
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});