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
  city: z.string(),
  country: z.string(),
  deliviry: z.boolean(),
  office: z.boolean(),
  timeStart: z.string(),
  timeEnd: z.string(),
  workDays: z.record(z.string(), z.boolean()),
});
export type LocationSchemaType = z.infer<typeof locationSchema>;
