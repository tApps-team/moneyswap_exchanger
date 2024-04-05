import {
  City,
  Country,
  useAllCountriesQuery,
  useCitiesByCountryNameQuery,
} from "@/entities/location";
import { LocationSelect } from "@/features/location";
import { LocationSelectRefactoringProps } from "@/features/location/locationSelect/ui/locationSelect";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Switch,
} from "@/shared/ui";
import { LocationDeliveryForm } from "@/widgets/locationOfficeDeliveryForm";
import { LocationSelectForm } from "@/widgets/locationSelectForm";
import { LocationTimeForm } from "@/widgets/locationTimeForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePen } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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

export type locationSchemaType = z.infer<typeof locationSchema>;
export const LocationAddPage = () => {
  const form = useForm<locationSchemaType>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      city: "",
      country: "",
      deliviry: false,
      office: false,
      timeEnd: "00:00",
      timeStart: "00:00",
      workDays: {
        Пн: false,
        Вт: false,
        Ср: false,
        Чт: false,
        Пт: false,
        Сб: false,
        Вс: false,
      },
    },
  });
  form.watch(["timeStart", "timeEnd", "country"]);

  const onSubmit = (data: locationSchemaType) => {
    console.log(data);
  };

  //Refactoring!!!!
  useEffect(() => {
    form.resetField("city");
  }, [form]);
  return (
    <div className="">
      <Form {...form}>
        <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
          <LocationSelectForm form={form} />
          <LocationDeliveryForm form={form} />
          <LocationTimeForm form={form} />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
