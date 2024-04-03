import { City, Country } from "@/entities/location";
import { CountrySelect } from "@/features/location";
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

const locationSchema = z.object({
  city: z.string(),
  country: z.string(),
  deliviry: z.boolean(),
  office: z.boolean(),
  timeStart: z.string().datetime(),
  timeEnd: z.string().datetime(),
  workDays: z.number().array(),
});
type locationSchemaType = z.infer<typeof locationSchema>;

export const LocationEditPage = () => {
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
            name={"country"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{form.getValues("country")}</FormLabel>
                <FormControl>
                  <CountrySelect
                    label={form.getValues("country")}
                    onClick={onChangeCountry}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CountrySelect type="city" />
          <div className="flex gap-16">
            <TimeSelect />
            <Input
              type="time"
              className="w-[103px]  h-[38px] p-2 bg-white rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 "
            />
          </div>
        </form>
      </Form>
    </div>
  );
};
