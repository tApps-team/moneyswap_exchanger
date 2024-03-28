import { CityCarousel } from "@/features/city";
import { AddCityButton } from "@/features/city/addCityButton";

export const HomePage = () => {
  return (
    <div className="flex gap-2">
      <AddCityButton />
      <CityCarousel />
    </div>
  );
};
