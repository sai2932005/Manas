import Reflection from "../models/Reflection.js";
import Session from "../models/Session.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc Create Reflection
// @route POST /api/reflection
// @access Private
export const createReflection = asyncHandler(async (req, res) => {
  const { session, thought } = req.body;

  const existingSession = await Session.findOne({
    _id: session,
    user: req.user._id,
  });

  if (!existingSession) {
    res.status(404);
    throw new Error("Session not found");
  }

  const reflection = await Reflection.create({
    user: req.user._id,
    session,
    thought,
  });

  res.status(201).json({
    success: true,
    reflection,
  });
});

// @desc Get Reflection By Id
// @route GET /api/reflection/:id
// @access Private
export const getReflectionById = asyncHandler(async (req, res) => {
  const reflection = await Reflection.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!reflection) {
    res.status(404);
    throw new Error("Reflection not found");
  }

  res.status(200).json({
    success: true,
    reflection,
  });
});

// @desc Get Reflections of Session
// @route GET /api/reflection/session/:sessionId
// @access Private
export const getSessionReflections = asyncHandler(async (req, res) => {
  const reflections = await Reflection.find({
    session: req.params.sessionId,
    user: req.user._id,
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: reflections.length,
    reflections,
  });
});

// @desc Update Reflection
// @route PATCH /api/reflection/:id
// @access Private
export const updateReflection = asyncHandler(async (req, res) => {
  const reflection = await Reflection.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!reflection) {
    res.status(404);
    throw new Error("Reflection not found");
  }

  const {
    thought,
    distortion,
    barrier,
    technique,
    experiment,
    balancedThought,
    reflection: userReflection,
    status,
  } = req.body;

  if (thought !== undefined) reflection.thought = thought;
  if (distortion !== undefined) reflection.distortion = distortion;
  if (barrier !== undefined) reflection.barrier = barrier;
  if (technique !== undefined) reflection.technique = technique;
  if (experiment !== undefined) reflection.experiment = experiment;
  if (balancedThought !== undefined)
    reflection.balancedThought = balancedThought;
  if (userReflection !== undefined)
    reflection.reflection = userReflection;
  if (status !== undefined) reflection.status = status;

  await reflection.save();

  res.status(200).json({
    success: true,
    reflection,
  });
});

// @desc Delete Reflection
// @route DELETE /api/reflection/:id
// @access Private
export const deleteReflection = asyncHandler(async (req, res) => {
  const reflection = await Reflection.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!reflection) {
    res.status(404);
    throw new Error("Reflection not found");
  }

  await reflection.deleteOne();

  res.status(200).json({
    success: true,
    message: "Reflection deleted successfully",
  });
});