import { z } from "zod";

export const directionSchema = z.object({
  activeCity: z.object({
    id: z.number(),
    name: z.string(),
    code_name: z.string(),
    country: z.string(),
    country_flag: z.string(),
    info: z.object({
      delivery: z.boolean(),
      office: z.boolean(),
      working_days: z.record(z.string(), z.boolean()),
      time_from: z.string(),
      time_to: z.string(),
    }),
  }),
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
export type DirectionSchemaType = z.infer<typeof directionSchema>;
