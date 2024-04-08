import { LocationSchemaType } from "@/entities/location";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Switch,
} from "@/shared/ui";

import { SquarePen } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
type LocationOfficeDeliveryForm = {
  form: UseFormReturn<LocationSchemaType>;
};
export const LocationDeliveryForm = (props: LocationOfficeDeliveryForm) => {
  const { form } = props;

  return (
    <div className="flex flex-col gap-4">
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
    </div>
  );
};
