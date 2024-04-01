import { z } from "zod";

export const authFormSchema = z.object({
  username: z
    .string({ required_error: "Это обязательое поле" })
    .min(2, { message: "Это обязательое поле" }),
  password: z
    .string({ required_error: "Это обязательое поле" })
    .min(1, { message: "Это обязательое поле" }),
});
export type AuthFormSchema = z.infer<typeof authFormSchema>;
