import express from "express";
import { UserController } from "./controller.js";
import { validate, authenticate } from "#root/src/utils/middlewares.js";
import { updateUserSchema } from "./validator.js";

const router = express.Router();

router.get("/me", authenticate, UserController.me);
router.patch(
  "/",
  authenticate,
  validate(updateUserSchema),
  UserController.edit,
);

export default router;
