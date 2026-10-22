import { z } from "zod";

export const productSchema = z.object({
  body: z
    .object({
      name: z.string().trim().min(2).max(100),
      category: z.enum(["BODY_CARE", "FACE_BEAUTY", "HAIR_STRENGTH", "HOME"]),
      description: z.string().trim().min(1),
      price: z.number().int().min(0),
      oldPrice: z.number().int().min(0).optional().nullable(),
      image: z.string().trim().url(),
      size: z.string().trim().min(1),
      skinType: z.string().trim().optional().nullable(),
      ingredients: z.array(z.string().trim().min(1)),
      benefits: z.array(z.string().trim().min(1)),
      scent: z.record(z.string(), z.unknown()).optional().nullable(),
      howToUse: z.string().trim().min(1),
      details: z.array(z.string().trim().min(1)),
    })
    .strict(),
});
