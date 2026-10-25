import express from "express";
import { AdminController } from "./controller.js";
import {
  validate,
  authenticate,
  requireAdmin,
} from "#root/src/utils/middlewares.js";

const router = express.Router();

router.get("/dashboard", authenticate, requireAdmin, AdminController.dashboard);

export default router;
