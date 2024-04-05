import { locationSchemaType } from "@/pages/locationAdd/ui/locationAddPage";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Switch,
} from "@/shared/ui";
import { UseFormReturn } from "react-hook-form";
type LocationTimeFormProps = {
  form: UseFormReturn<locationSchemaType>;
};
export const LocationTimeForm = (props: LocationTimeFormProps) => {
  const { form } = props;
  return (
    <div className="flex flex-col gap-12">
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
    </div>
  );
};
