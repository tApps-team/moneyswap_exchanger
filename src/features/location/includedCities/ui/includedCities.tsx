import { useTranslation } from "react-i18next";
import { useState } from "react";
import { City, LocationSchemaType, LocationEditSchemaType } from "@/entities/location";
import { FormLabel } from "@/shared/ui";
import { IncludedCitiesBlock } from "./includedCities-block";

type LocationFormType = LocationSchemaType | LocationEditSchemaType;

interface IncludedCitiesProps<T extends LocationFormType> {
  formState: T;
  onFormStateChange: (newState: T) => void;
}

export const IncludedCities = <T extends LocationFormType>({ 
  formState, 
  onFormStateChange 
}: IncludedCitiesProps<T>) => {
  const { t } = useTranslation();
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleCityStatus = (city: City, isActive: boolean) => {
    if (isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      if (isActive) {
        const newActiveCities = formState.active_pks.filter(c => c.id !== city.id);
        const newUnactiveCities = [...formState.unactive_pks, city];

        onFormStateChange({
          ...formState,
          active_pks: newActiveCities,
          unactive_pks: newUnactiveCities
        } as T);
      } else {
        const newUnactiveCities = formState.unactive_pks.filter(c => c.id !== city.id);
        const newActiveCities = [...formState.active_pks, city];

        onFormStateChange({
          ...formState,
          active_pks: newActiveCities,
          unactive_pks: newUnactiveCities
        } as T);
      }

      setIsAnimating(false);
    }, 150);
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        <FormLabel className="text-mainColor font-medium text-lg uppercase">
          {t("choosen_cities.title")}
        </FormLabel>
        <IncludedCitiesBlock cities={formState.active_pks} isActive={true} onClick={toggleCityStatus} />
        <IncludedCitiesBlock cities={formState.unactive_pks} isActive={false} onClick={toggleCityStatus} />
      </div>
    </div>
  )
};
