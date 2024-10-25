import { z } from "zod";

export const authFormSchema = z.object({
  username: z
    .string({ required_error: "required..." })
    .min(2, { message: "required..." }),
  password: z
    .string({ required_error: "required..." })
    .min(1, { message: "required..." }),
});
export type AuthFormSchema = z.infer<typeof authFormSchema>;
