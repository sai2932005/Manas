import Session from "../models/Session.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Create a new session
// @route   POST /api/session
// @access  Private
export const createSession = asyncHandler(async (req, res) => {
  const { title, moodBefore } = req.body;

  const session = await Session.create({
    user: req.user._id,
    title,
    moodBefore,
  });

  res.status(201).json({
    success: true,
    session,
  });
});

// @desc    Get all sessions of logged-in user
// @route   GET /api/session
// @access  Private
export const getUserSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find({
    user: req.user._id,
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: sessions.length,
    sessions,
  });
});

// @desc    Get single session
// @route   GET /api/session/:id
// @access  Private
export const getSessionById = asyncHandler(async (req, res) => {
  const session = await Session.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!session) {
    res.status(404);
    throw new Error("Session not found");
  }

  res.status(200).json({
    success: true,
    session,
  });
});

// @desc    Update session
// @route   PATCH /api/session/:id
// @access  Private
export const updateSession = asyncHandler(async (req, res) => {
  const session = await Session.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!session) {
    res.status(404);
    throw new Error("Session not found");
  }

  const { title, currentStep, status, moodAfter } = req.body;

  if (title !== undefined) session.title = title;
  if (currentStep !== undefined) session.currentStep = currentStep;
  if (status !== undefined) session.status = status;
  if (moodAfter !== undefined) session.moodAfter = moodAfter;

  if (status === "completed") {
    session.completedAt = new Date();
  }

  await session.save();

  res.status(200).json({
    success: true,
    session,
  });
});

// @desc    Delete session
// @route   DELETE /api/session/:id
// @access  Private
export const deleteSession = asyncHandler(async (req, res) => {
  const session = await Session.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!session) {
    res.status(404);
    throw new Error("Session not found");
  }

  await session.deleteOne();

  res.status(200).json({
    success: true,
    message: "Session deleted successfully",
  });
});