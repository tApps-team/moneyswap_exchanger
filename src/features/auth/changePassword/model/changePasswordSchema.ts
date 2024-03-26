import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string({ required_error: "Это обязательое поле" }),
    newPassword: z.string({ required_error: "Это обязательое поле" }),
    confirmPassword: z.string({ required_error: "Это обязательое поле" }),
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
