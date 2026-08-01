import express from "express";

import {
  createReflection,
  getReflectionById,
  getSessionReflections,
  updateReflection,
  deleteReflection,
} from "../controllers/reflection.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createReflection);

router.get("/session/:sessionId", getSessionReflections);

router
  .route("/:id")
  .get(getReflectionById)
  .patch(updateReflection)
  .delete(deleteReflection);

export default router;