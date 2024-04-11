import { z } from "zod";

export const directionSchema = z.object({
  directions: z.array(
    z.object({
      id: z.number(),
      // valute_from: z.string(),
      // icon_valute_from: z.string(),
      // valute_to: z.string(),
      // icon_valute_to: z.string(),
      in_count: z.number(),
      out_count: z.number(),
      is_active: z.boolean(),
    })
  ),
});
export type DirectionSchemaType = z.infer<typeof directionSchema>;

export const directionAddSchema = z.object({
  giveCurrency: z
    .object({
      id: z.number().nullable(),
      name: z.string(),
      code_name: z.string(),
      icon_url: z.string(),
    })
    .nullable(),
  getCurrency: z
    .object({
      id: z.number().nullable(),
      name: z.string(),
      code_name: z.string(),
      icon_url: z.string(),
    })
    .nullable(),
  giveCurrencyPrice: z.coerce.number().positive().min(1),
  getCurrencyPrice: z.coerce.number().positive().min(1),
});
export type DirectionAddSchemaType = z.infer<typeof directionAddSchema>;
