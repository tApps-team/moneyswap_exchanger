import { CurrencyType } from "@/shared/types";
import { z } from "zod";

const currencyNameSchema = z.object({
  ru: z.string(),
  en: z.string(),
});

const currencySchema = z
  .object({
    id: z.string().nullable(),
    name: currencyNameSchema,
    code_name: z.string(),
    icon_url: z.string(),
    is_popular: z.boolean().optional(),
    type_valute: z.enum([
      CurrencyType.Cryptocurrency,
      CurrencyType.Cash,
      CurrencyType.Transfers,
      CurrencyType.Banking,
      CurrencyType.ElMoney,
      CurrencyType.Bankomat,
    ]),
  })
  .nullable();

const positiveNumberSchema = z.coerce
  .number()
  .positive({ message: "> 0" })
  .min(0.00000001, { message: "> 0" });

const bankomatSchema = z.object({
  id: z.number(),
  available: z.boolean(),
  name: z.string(),
  icon: z.string(),
});

export const directionSchema = z.object({
  directions: z.array(
    z.object({
      id: z.number(),
      in_count: positiveNumberSchema,
      out_count: positiveNumberSchema,
      is_active: z.boolean(),
    })
  ),
});

export type DirectionSchemaType = z.infer<typeof directionSchema>;

export const directionAddSchema = z.object({
  giveCurrency: currencySchema,
  getCurrency: currencySchema,
  giveCurrencyPrice: positiveNumberSchema,
  getCurrencyPrice: positiveNumberSchema,
  bankomats: z.union([z.array(bankomatSchema), z.null()]),
});

export type DirectionAddSchemaType = z.infer<typeof directionAddSchema>;
