import express from "express";
import { ProductController } from "./controller.js";
import {
  validate,
  authenticate,
  requireAdmin,
} from "#root/src/utils/middlewares.js";
import { productSchema } from "./validator.js";

const router = express.Router();

router.get("/", ProductController.index);
router.get("/:id", ProductController.show);
router.put(
  "/:id",
  authenticate,
  requireAdmin,
  validate(productSchema),
  ProductController.edit,
);
router.post(
  "/",
  authenticate,
  requireAdmin,
  validate(productSchema),
  ProductController.store,
);
router.delete("/:id", authenticate, requireAdmin, ProductController.destroy);

export default router;
