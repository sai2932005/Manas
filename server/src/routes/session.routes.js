import express from "express";

import {
  createSession,
  getUserSessions,
  getSessionById,
  updateSession,
  deleteSession,
} from "../controllers/session.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.route("/")
  .post(createSession)
  .get(getUserSessions);

router.route("/:id")
  .get(getSessionById)
  .patch(updateSession)
  .delete(deleteSession);

export default router;