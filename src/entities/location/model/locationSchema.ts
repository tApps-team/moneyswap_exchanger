import { z } from "zod";

export const locationSchema = z.object({
  location: z.object({
    country_id: z.number(),
    id: z.number(),
    name: z.object({
      ru: z.string(),
      en: z.string(),
    }),
    code_name: z.string().optional(),
    country_flag: z.string(),
    country: z
      .object({
        ru: z.string(),
        en: z.string(),
      })
      .optional(),
  }),
  deliviry: z.boolean(),
  office: z.boolean(),
  weekdays: z.object({ time_from: z.string(), time_to: z.string() }),
  weekends: z.object({ time_from: z.string(), time_to: z.string() }),
  workDays: z.record(z.string(), z.boolean()),
  min_amount: z
    .number()
    .min(0,{ message: "> 0" })
    .nullable()
    .optional(),
  max_amount: z
    .number()
    .positive({ message: "> 0" })
    .min(0.00000001)
    .nullable()
    .optional(),
  active_pks: z.array(z.object({
    id: z.number(),
    name: z.object({
      ru: z.string(),
      en: z.string(),
    }),
    code_name: z.string(),
  })).default([]),
  unactive_pks: z.array(z.object({
    id: z.number(),
    name: z.object({
      ru: z.string(),
      en: z.string(),
    }),
    code_name: z.string(),
  })).default([]),
});

export type LocationSchemaType = z.infer<typeof locationSchema>;

export const locationEditSchema = z.object({
  location: z.object({
    id: z.number(),
    name: z.object({
      ru: z.string(),
      en: z.string(),
    }),
    code_name: z.string().optional(),
  }),
  deliviry: z.boolean(),
  office: z.boolean(),
  weekdays: z.object({ time_from: z.string(), time_to: z.string() }),
  weekends: z.object({ time_from: z.string(), time_to: z.string() }),
  workDays: z.record(z.string(), z.boolean()),
  min_amount: z
    .number()
    .min(0,{ message: "> 0" })
    .nullable()
    .optional(),
  max_amount: z
    .number()
    .positive({ message: "> 0" })
    .min(0.00000001)
    .nullable()
    .optional(),
    active_pks: z.array(z.object({
      id: z.number(),
      name: z.object({
        ru: z.string(),
        en: z.string(),
      }),
      code_name: z.string(),
    })).default([]),
    unactive_pks: z.array(z.object({
      id: z.number(),
      name: z.object({
        ru: z.string(),
        en: z.string(),
      }),
      code_name: z.string(),
    })).default([]),
});

export type LocationEditSchemaType = z.infer<typeof locationEditSchema>;
