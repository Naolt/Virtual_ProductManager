import { z } from "zod";

const commaSeparatedString = z.string().refine(
  (val) => {
    return val.split(",").every((item) => item.trim().length > 0);
  },
  {
    message: "Must be a comma-separated list of non-empty strings",
  }
);

export const PersonaSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  demographics: z.object({
    ageRange: z.string().min(1, "Age Range is required"),
    location: z.string().min(1, "Location is required"),
    jobTitle: z.string().min(1, "Job Title is required"),
  }),
  behavior: commaSeparatedString,
  needsAndGoals: commaSeparatedString,
  painPoints: commaSeparatedString,
  motivations: commaSeparatedString,
});

export type PersonaType = z.infer<typeof PersonaSchema>;
