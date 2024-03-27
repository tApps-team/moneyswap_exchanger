import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({ required_error: "Это обязательое поле" })
      .min(1, { message: "Это обязательое поле" }),
    newPassword: z
      .string({ required_error: "Это обязательое поле" })
      .min(1, { message: "Это обязательое поле" }),
    confirmPassword: z
      .string({ required_error: "Это обязательое поле" })
      .min(1, { message: "Это обязательое поле" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
