import {
  LocationSchemaType,
  locationSchema,
  useAllCountriesQuery,
  useCitiesByCountryNameQuery,
} from "@/entities/location";
import { LocationSelect } from "@/features/location";

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
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const LocationAddForm = () => {
  const form = useForm<LocationSchemaType>({
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
  const onSubmit = (data: LocationSchemaType) => {
    console.log(data);
  };

  form.watch(["timeStart", "timeEnd", "country"]);

  const { data: countries } = useAllCountriesQuery();
  const { data: cities } = useCitiesByCountryNameQuery(
    {
      country_name: form.getValues("country"),
    },
    { skip: !form.getValues("country") }
  );
  useEffect(() => {
    form.resetField("city");
  }, [form]);
  return (
    <Form {...form}>
      <form
        className="grid grid-row-7 gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
                  setValue={form.setValue}
                  label={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"city"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{field.value}</FormLabel>
              <FormControl>
                <LocationSelect
                  disabled={!form.getValues("country")}
                  type="city"
                  setValue={form.setValue}
                  city={cities || []}
                  label={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <Button type="submit">Добавить </Button>
      </form>
    </Form>
  );
};
