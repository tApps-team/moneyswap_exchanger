import { AddCityButton, CityCarousel } from "@/features/location";
import styles from "./cities.module.scss";
import { useGetCitiesQuery } from "@/entities/myCity";
import { FC, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui";
import { directionSchemaType } from "@/entities/direction";

interface CitiesProps {
  form: UseFormReturn<directionSchemaType>;
}

export const Cities: FC<CitiesProps> = ({ form }) => {
  const {
    data: cities,
    isLoading: citiesLoading,
    error: citiesError,
  } = useGetCitiesQuery();

  useEffect(() => {
    if (cities) {
      form.setValue("activeCity", cities[0]);
    }
  }, [cities]);

  return (
    <div>
      <div className="mb-5 text-2xl">Мои города</div>
      <div className="flex gap-3">
        <AddCityButton />
        <FormField
          control={form.control}
          name={"activeCity.country"}
          render={() => (
            <FormItem>
              <FormControl>
                <div className={styles.cities}>
                  <CityCarousel
                    cities={cities || []}
                    setValue={form.setValue}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
