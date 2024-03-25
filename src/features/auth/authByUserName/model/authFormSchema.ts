import { z } from "zod";

export const authFormSchema = z.object({
  username: z.string({ required_error: "Это обязательое поле" }).min(2),
  password: z.string({ required_error: "Это обязательое поле" }),
});
export type AuthFormSchema = z.infer<typeof authFormSchema>;
