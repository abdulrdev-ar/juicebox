import { z } from "zod";

export const assessmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please type in your first name.")
    .max(50, "Keep your first name under 50 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Please type in your email address.")
    .pipe(z.email("That email doesn’t look right. Check it for typos.")),
});

export type AssessmentFormValues = z.infer<typeof assessmentSchema>;
