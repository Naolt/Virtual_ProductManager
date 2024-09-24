import { z } from "zod";

// Product Overview Schema using Zod
export const productOverviewSchema = z.object({
  productName: z
    .string()
    .min(2, "Product name must be at least 2 characters long")
    .max(100, "Product name can't exceed 100 characters"),

  productDescription: z
    .string()
    .min(10, "Product description must be at least 10 characters long")
    .max(500, "Product description can't exceed 500 characters"),

  productGoals: z
    .string()
    .min(10, "Product goals must be at least 10 characters long")
    .max(300, "Product goals can't exceed 300 characters"),

  targetAudience: z
    .string()
    .min(5, "Target audience must be at least 5 characters long")
    .max(200, "Target audience can't exceed 200 characters"),

  valueProposition: z
    .string()
    .min(10, "Value proposition must be at least 10 characters long")
    .max(300, "Value proposition can't exceed 300 characters"),

  keyFeatures: z.string().min(1, "At least one key feature is required"),

  // Optional: Add more fields based on your specific requirements.
  additionalNotes: z.string().optional(),
});
