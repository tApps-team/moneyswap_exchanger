import { City, Country } from "@/entities/location";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePen } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const cities: City[] = [
  {
    code_name: "BAN",
    id: 1,
    name: "Багкок",
  },
  {
    code_name: "BAN",
    id: 2,
    name: "Багкок",
  },
  {
    code_name: "BAN",
    id: 3,
    name: "Багкок",
  },
  {
    code_name: "BAN",
    id: 4,
    name: "Багкок",
  },
  {
    code_name: "BAN",
    id: 5,
    name: "Багкок",
  },
  {
    code_name: "BAN",
    id: 6,
    name: "Тайланд",
  },
  {
    code_name: "BAN",
    id: 7,
    name: "Багкок",
  },
  {
    code_name: "BAN",
    id: 8,
    name: "Багкок",
  },
  {
    code_name: "BAN",
    id: 9,
    name: "Багкок",
  },
  {
    code_name: "BAN",
    id: 10,
    name: "Багкок",
  },
];
const countries: Country[] = [
  {
    country_icon: "asdasd",
    id: 1,
    name: "Багкок",
  },
  {
    country_icon: "asdasd",
    id: 2,
    name: "Багкок",
  },
  {
    country_icon: "asdasd",
    id: 3,
    name: "Багкок",
  },
  {
    country_icon: "asdasd",
    id: 4,
    name: "Багкок",
  },
  {
    country_icon: "asdasd",
    id: 5,
    name: "Багкок",
  },
  {
    country_icon: "asdasd",
    id: 6,
    name: "Тайланд",
  },
  {
    country_icon: "asdasd",
    id: 7,
    name: "Багкок",
  },
  {
    country_icon: "asdasd",
    id: 8,
    name: "Багкок",
  },
  {
    country_icon: "asdasd",
    id: 9,
    name: "Багкок",
  },
  {
    country_icon: "asdasd",
    id: 10,
    name: "Багкок",
  },
];
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
  form.watch(["timeStart", "timeEnd"]);
  const onSubmit = (data: locationSchemaType) => {
    console.log(data);
  };

  return (
    <div className="">
      <Form {...form}>
        <form className="grid gap-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={"city"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{field.value}</FormLabel>
                <FormControl>
                  <LocationSelect
                    type="city"
                    city={cities}
                    label={field.value}
                  />
                  {/* <LocationSelectRefactoringProps labelWitchIcon/> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"country"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{field.value}</FormLabel>
                <FormControl>
                  <LocationSelect
                    type="country"
                    country={countries}
                    label={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-16">
            <FormField
              control={form.control}
              name={"timeStart"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="time"
                      className="w-[103px]  h-[38px] p-2 bg-white rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"timeEnd"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="time"
                      className=" w-[103px]  h-[38px] p-2 bg-white rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name={"deliviry"}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex justify-between">
                    <div className="flex gap-6">
                      <SquarePen />
                      <div>Доставка</div>
                    </div>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"office"}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex justify-between">
                    <div className="flex gap-6">
                      <SquarePen />
                      <div>Есть офис</div>
                    </div>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex">
            {Object.keys(form.formState.defaultValues?.workDays || {}).map(
              (day) => (
                <FormField
                  key={day}
                  control={form.control}
                  name={`workDays.${day}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col items-center gap-4">
                          <Switch
                            className="rotate-90"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <div>{day}</div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            )}
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
