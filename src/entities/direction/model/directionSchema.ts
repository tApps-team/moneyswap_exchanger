import { CurrencyType } from "@/shared/types";
import { z } from "zod";

export const directionSchema = z.object({
  directions: z.array(
    z.object({
      id: z.number(),
      // valute_from: z.string(),
      // icon_valute_from: z.string(),
      // valute_to: z.string(),
      // icon_valute_to: z.string(),
      in_count: z.coerce.number().positive().min(0.00000001),
      out_count: z.coerce.number().positive().min(0.00000001),
      is_active: z.boolean(),
    })
  ),
});
export type DirectionSchemaType = z.infer<typeof directionSchema>;

export const directionAddSchema = z.object({
  giveCurrency: z.object(
    {
      id: z.number().nullable(),
      name: z.string(),
      code_name: z.string(),
      icon_url: z.string(),
      type_valute: z.nativeEnum(CurrencyType),
    },
    {
      required_error: "Это поле обязательно",
      description: "Это поле обязательно",
    }
  ),
  getCurrency: z.object({
    id: z.number().nullable(),
    name: z.string(),
    code_name: z.string(),
    icon_url: z.string(),
    type_valute: z.nativeEnum(CurrencyType),
  }),
  giveCurrencyPrice: z.coerce.number().positive().min(0.00000001),
  getCurrencyPrice: z.coerce.number().positive().min(0.00000001),
});
export type DirectionAddSchemaType = z.infer<typeof directionAddSchema>;
