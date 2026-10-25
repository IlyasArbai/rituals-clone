import express from "express";
import { OrderController } from "./controller.js";
import {
  validate,
  authenticate,
  requireAdmin,
} from "#root/src/utils/middlewares.js";
import { orderIdSchema, orderStatusSchema } from "./validator.js";

const router = express.Router();

router.post(
  "/:id/status",
  authenticate,
  requireAdmin,
  validate(orderIdSchema),
  validate(orderStatusSchema),
  OrderController.edit,
);

export default router;
