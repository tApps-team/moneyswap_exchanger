import {
  LocationEditSchemaType,
  locationEditSchema,
  useEditPartnerCityMutationAuth,
} from "@/entities/location";
import { LocationSelect } from "@/features/location";
import { useAppSelector } from "@/shared/model";
import { paths } from "@/shared/routing";

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
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const LocationEditForm = () => {
  const activeEditCity = useAppSelector((state) => state.activeCity.activeCity);

  const form = useForm<LocationEditSchemaType>({
    resolver: zodResolver(locationEditSchema),
    defaultValues: {
      city: {
        code_name: activeEditCity?.code_name,
        name: activeEditCity?.name,
      },
      country: {
        country_flag: activeEditCity?.country,
        name: activeEditCity?.country,
      },
      deliviry: activeEditCity?.info.delivery,
      office: activeEditCity?.info.office,
      timeEnd: activeEditCity?.info.time_from,
      timeStart: activeEditCity?.info.time_to,
      workDays: activeEditCity?.info.working_days,
    },
  });
  const navigate = useNavigate();

  const [editPartnerCity] = useEditPartnerCityMutationAuth();

  const onSubmit = (data: LocationEditSchemaType) => {
    console.log(data);
    editPartnerCity({
      city: activeEditCity?.code_name,
      delivery: data.deliviry,
      office: data.office,
      time_from: data.timeStart,
      time_to: data.timeEnd,
      working_days: data.workDays,
    })
      .unwrap()
      .then(() => navigate(paths.home));
  };
  console.log(activeEditCity?.info.time_from);
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
            <FormItem className="flex flex-col gap-3">
              <FormLabel className="text-mainColor text-xl">Страна</FormLabel>
              <FormControl>
                <LocationSelect
                  type="country"
                  disabled={true}
                  label={activeEditCity?.country}
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
            <FormItem className="flex flex-col gap-3">
              <FormLabel className="text-mainColor text-xl">Город</FormLabel>
              <FormControl>
                <LocationSelect
                  disabled={true}
                  type="city"
                  label={activeEditCity?.name}
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
            <FormItem className="flex items-center justify-between">
              <FormLabel className="text-white">Доставка</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"office"}
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel className="text-white">Есть офис</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
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
                    className="w-[103px]  h-[38px] p-2 bg-darkGray text-white rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 "
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
                    className="w-[103px]  h-[38px] p-2 bg-darkGray text-white rounded-full focus-visible:ring-transparent focus-visible:ring-offset-0 "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-6 text-white">
          <div className="text-xl text-white">Дни работы</div>
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
                            defaultChecked={
                              activeEditCity?.info.working_days[day]
                            }
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
        </div>
        <Button
          className="rounded-full border border-bg-darkGray h-14 bg-darkGray text-mainColor text-xl"
          type="submit"
        >
          Сохранить{" "}
        </Button>
      </form>
    </Form>
  );
};
