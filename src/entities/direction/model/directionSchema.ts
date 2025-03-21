import { CurrencyType } from "@/shared/types";
import { z } from "zod";

const currencyNameSchema = z.object({
  ru: z.string(),
  en: z.string(),
});

const currencySchema = z
  .object({
    id: z.string(),
    name: currencyNameSchema,
    code_name: z.string(),
    icon_url: z.string(),
    is_popular: z.boolean(),
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

export const exchangeRateSchema = z.object({
  min_count: z.number().nullable(),
  max_count: z.number().nullable(),
  in_count: positiveNumberSchema,
  out_count: positiveNumberSchema,
  rate_coefficient: z.number().min(0).nullable(),
  id: z.number().nullable(),
});

export const exchangeRateAddSchema = z.object({
  min_count: z.number().nullable(),
  max_count: z.number().nullable(),
  in_count: positiveNumberSchema,
  out_count: positiveNumberSchema,
  rate_coefficient: positiveNumberSchema,
});

export const directionSchema = z.object({
  directions: z.array(
    z.object({
      id: z.number(),
      is_active: z.boolean(),
      exchange_rates: z.array(exchangeRateSchema).nullable(),
    })
  ),
});

export type DirectionSchemaType = z.infer<typeof directionSchema>;

export const directionAddSchema = z.object({
  valute_from: currencySchema,
  valute_to: currencySchema,
  is_active: z.boolean(),
  bankomats: z.union([z.array(bankomatSchema), z.null()]),
  exchange_rates: z.array(exchangeRateAddSchema).nullable(),
  is_exchange_rates: z.boolean(),
});

export type DirectionAddSchemaType = z.infer<typeof directionAddSchema>;
