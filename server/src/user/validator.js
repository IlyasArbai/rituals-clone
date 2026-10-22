import { z } from "zod";

export const updateUserSchema = z.object({
  body: z
    .object({
      name: z.string().trim().min(2).max(20).optional(),
      email: z.string().trim().email().max(30).toLowerCase().optional(),
    })
    .strict()
    .refine((data) => data.name !== undefined || data.email !== undefined, {
      message: "At least one field (name or email) must be provided",
    }),
});
