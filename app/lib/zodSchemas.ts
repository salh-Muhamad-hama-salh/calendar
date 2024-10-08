import { z } from "zod";

export const onboardingSchema = z.object({
  fullName: z.string().min(3).max(150),
  username: z
    .string()
    .min(3)
    .max(150)
    .regex(/^[a-zA-Z0-9-]+$/, {
      message: "Username can only contain letters, numbers and -",
    }),
});
