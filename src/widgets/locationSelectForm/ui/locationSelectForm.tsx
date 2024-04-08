import {
  LocationSchemaType,
  useAllCountriesQuery,
  useCitiesByCountryNameQuery,
} from "@/entities/location";
import { LocationSelect } from "@/features/location";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui";
import { UseFormReturn } from "react-hook-form";
type LocationSelectFormProps = {
  form: UseFormReturn<LocationSchemaType>;
};
export const LocationSelectForm = (props: LocationSelectFormProps) => {
  const { form } = props;
  const { data: countries } = useAllCountriesQuery();
  const { data: cities } = useCitiesByCountryNameQuery(
    {
      country_name: form.getValues("country"),
    },
    { skip: !form.getValues("country") }
  );

  return (
    <div>
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
    </div>
  );
};
