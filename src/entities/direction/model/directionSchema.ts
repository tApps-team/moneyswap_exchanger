import { CurrencyType } from "@/shared/types";
import { z } from "zod";

export const directionSchema = z.object({
  directions: z.array(
    z.object({
      id: z.number(),
      in_count: z.coerce
        .number({ required_error: "> 0" })
        .positive({ message: "> 0" })
        .min(0.00000001, { message: "> 0" }),
      out_count: z.coerce
        .number()
        .positive({ message: "> 0" })
        .min(0.00000001, { message: "> 0" }),
      is_active: z.boolean(),
    })
  ),
});
export type DirectionSchemaType = z.infer<typeof directionSchema>;

export const directionAddSchema = z.object({
  giveCurrency: z.object(
    {
      id: z.number().nullable(),
      name: z.object({
        ru: z.string(),
        en: z.string(),
      }),
      code_name: z.string(),
      icon_url: z.string(),
      type_valute: z.enum([
        CurrencyType.Cryptocurrency,
        CurrencyType.Cash,
        CurrencyType.Transfers,
        CurrencyType.Banking,
        CurrencyType.ElMoney,
        CurrencyType.Bankomat,
      ]),
    },
    {
      required_error: "required...",
      description: "required...",
    }
  ),
  getCurrency: z.object(
    {
      id: z.number().nullable(),
      name: z.object({
        ru: z.string(),
        en: z.string(),
      }),
      code_name: z.string(),
      icon_url: z.string(),
      type_valute: z.enum([
        CurrencyType.Cryptocurrency,
        CurrencyType.Cash,
        CurrencyType.Transfers,
        CurrencyType.Banking,
        CurrencyType.ElMoney,
        CurrencyType.Bankomat,
      ]),
    },
    {
      required_error: "required...",
      description: "required...",
    }
  ),
  giveCurrencyPrice: z.coerce
    .number()
    .positive({ message: "> 0" })
    .min(0.00000001),
  getCurrencyPrice: z.coerce
    .number()
    .positive({ message: "> 0" })
    .min(0.00000001),
  bankomats: z.union([
    z.array(
      z.object({
        id: z.number(),
        available: z.boolean(),
        name: z.string(),
        icon: z.string(),
      })
    ),
    z.null(),
  ]),
});
export type DirectionAddSchemaType = z.infer<typeof directionAddSchema>;
