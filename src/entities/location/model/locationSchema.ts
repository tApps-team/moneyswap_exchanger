import { z } from "zod";

const workDays = {
  Пн: false,
  Вт: false,
  Ср: false,
  Чт: false,
  Пт: false,
  Сб: false,
  Вс: false,
};

export const locationSchema = z.object({
  city: z.object(
    {
      name: z.object({
        ru: z.string(),
        en: z.string(),
      }),
      code_name: z.string(),
      id: z.number(),
    },
    { required_error: "required..." }
  ),
  country: z.object(
    {
      name: z.object({
        ru: z.string(),
        en: z.string(),
      }),
      country_flag: z.string(),
      id: z.number(),
    },
    { required_error: "required..." }
  ),
  deliviry: z.boolean(),
  office: z.boolean(),
  weekdays: z.object({ time_from: z.string(), time_to: z.string() }),
  weekends: z.object({ time_from: z.string(), time_to: z.string() }),
  workDays: z.record(z.string(), z.boolean()),
});

export type LocationSchemaType = z.infer<typeof locationSchema>;

export const locationEditSchema = z.object({
  city: z.object({
    name: z.object({
      ru: z.string(),
      en: z.string(),
    }),
    code_name: z.string(),
  }),
  country: z.object({
    name: z.object({
      ru: z.string(),
      en: z.string(),
    }),
    country_flag: z.string(),
  }),
  deliviry: z.boolean(),
  office: z.boolean(),
  weekdays: z.object({ time_from: z.string(), time_to: z.string() }),
  weekends: z.object({ time_from: z.string(), time_to: z.string() }),
  workDays: z.record(z.string(), z.boolean()),
});

export type LocationEditSchemaType = z.infer<typeof locationEditSchema>;
