import { z } from "zod";

export const directionSchema = z.object({
  directions: z.array(
    z.object({
      id: z.number(),
      valute_from: z.string(),
      icon_valute_from: z.string(),
      valute_to: z.string(),
      icon_valute_to: z.string(),
      in_count: z.number(),
      out_count: z.number(),
      is_active: z.boolean(),
    })
  ),
});
export type directionSchemaType = z.infer<typeof directionSchema>;
