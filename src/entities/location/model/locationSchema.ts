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
  city: z
    .object({
      name: z.string(),
      code_name: z.string(),
      id: z.number(),
    })
    .nullable(),
  country: z
    .object({
      id: z.number(),
      name: z.string(),
      country_flag: z.string(),
    })
    .nullable(),
  deliviry: z.boolean(),
  office: z.boolean(),
  timeStart: z.string(),
  timeEnd: z.string(),
  workDays: z.record(z.string(), z.boolean()),
});
export type LocationSchemaType = z.infer<typeof locationSchema>;

export const locationEditSchema = z.object({
  city: z.object({
    name: z.string(),
    code_name: z.string(),
  }),
  country: z.object({
    name: z.string(),
    country_flag: z.string(),
  }),
  deliviry: z.boolean(),
  office: z.boolean(),
  timeStart: z.string(),
  timeEnd: z.string(),
  workDays: z.record(z.string(), z.boolean()),
});

export type LocationEditSchemaType = z.infer<typeof locationEditSchema>;
