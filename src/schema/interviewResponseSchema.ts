import { z } from "zod";

export const questionResponseSchema = z.object({
  questionId: z.string(), // Validate that questionId is a string
  questionText: z.string(), // Validate that questionText is a string
  response: z.string().min(1, "Response is required"), // Validate that response is a string
});

export const interviewDataSchema = z.object({
  name: z.string(), // Validate that name is a string
  email: z.string().email().optional(), // Validate email if present and must be a valid email format
  role: z.string(), // Validate that role is a string
  industry: z.string(), // Validate that industry is a string

  personaType: z.string().min(1, "Persona type is required"), // Validate that personaType is a string
  date: z.string(), // Validate that date is a Date object
  interviewMode: z.enum(["in-person", "remote"]), // Validate that interviewMode is one of the two values

  // Validate questions as an array of objects matching the questionResponseSchema
  questions: z.array(questionResponseSchema),
});
