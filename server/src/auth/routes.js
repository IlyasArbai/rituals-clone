import express from "express";
import { AuthController } from "./controller.js";
import { registerSchema, loginSchema, sendSchema } from "./validation.js";
import { validate, authenticate } from "#root/src/utils/middlewares.js";

const router = express.Router();

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);
router.post("/logout", authenticate, AuthController.logout);
router.get("/me", authenticate, AuthController.me);
router.post(
  "/send",
  authenticate,
  validate(sendSchema),
  AuthController.sendToken,
);

router.get("/:token", AuthController.verifyToken);
router.post("/:token", AuthController.resetPassword);

export default router;
