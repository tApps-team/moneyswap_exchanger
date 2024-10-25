import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({ required_error: "required..." })
      .min(1, { message: "required..." }),
    newPassword: z
      .string({ required_error: "required..." })
      .min(1, { message: "required..." }),
    confirmPassword: z
      .string({ required_error: "required..." })
      .min(1, { message: "required..." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
