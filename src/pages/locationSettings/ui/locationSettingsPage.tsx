import { City, Country } from "@/entities/location";
import { LocationSelect } from "@/features/location";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared/ui";
import { TimeSelect } from "@/widgets/timeSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "./location.scss";
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
export const locationSchema = z.object({
  city: z.string(),
  country: z.string(),
  deliviry: z.boolean(),
  office: z.boolean(),
  timeStart: z.string().datetime(),
  timeEnd: z.string().datetime(),
  workDays: z.number().array(),
});
export type locationSchemaType = z.infer<typeof locationSchema>;
export const LocationSettingsPage = () => {
  const form = useForm<locationSchemaType>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      city: "",
      country: "",
      deliviry: false,
      office: false,
      timeEnd: "00:00",
      timeStart: "00:00",
      workDays: [],
    },
  });
  form.watch(["timeStart", "timeEnd"]);
  console.log(form.getValues("timeStart"));
  console.log(form.getValues("timeEnd"));

  const onChangeCountry = (location: Country | City) => {
    form.setValue("country", location.name);
    console.log(form.getValues("country"));
  };
  const onChangeCity = (location: Country | City) => {
    form.setValue("country", location.name);
    console.log(form.getValues("country"));
  };

  return (
    <div className="grid gap-4">
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name={"city"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{form.getValues("city")}</FormLabel>
                <FormControl>
                  <LocationSelect
                    type="city"
                    city={cities}
                    label={form.getValues("city")}
                  />
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
                <FormLabel>{form.getValues("country")}</FormLabel>
                <FormControl>
                  <LocationSelect
                    type="country"
                    country={countries}
                    label={form.getValues("country")}
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
                      {...field}
                      onChange={(e) =>
                        form.setValue("timeStart", e.target.value)
                      }
                      type="time"
                      className="w-[103px]  h-[38px] p-2 bg-white rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 "
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
                      {...field}
                      onChange={(e) => form.setValue("timeEnd", e.target.value)}
                      type="time"
                      className=" w-[103px]  h-[38px] p-2 bg-white rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <TimeSelect />
        </form>
      </Form>
    </div>
  );
};
