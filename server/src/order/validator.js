import { z } from "zod";

export const createOrderSchema = z.object({
  body: z
    .object({
      items: z
        .array(
          z
            .object({
              productId: z.number().int().positive(),
              quantity: z.number().int().positive().max(100),
            })
            .strict(),
        )
        .min(1)
        .max(50)
        .refine(
          (items) =>
            new Set(items.map((item) => item.productId)).size === items.length,
          { message: "Duplicate product IDs are not allowed" },
        ),
    })
    .strict(),
});

export const orderIdSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});

export const orderStatusSchema = z.object({
  body: z
    .object({
      status: z.enum(["Preparing", "Delivering", "Delivered", "Cancelled"]),
    })
    .strict(),
});
