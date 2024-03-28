import { CityCarousel } from "@/features/city";
import { AddCityButton } from "@/features/city/addCityButton";

export const MyCities = () => {
  return (
    <div>
      <div>Мои города</div>
      <div className="flex gap-2">
        <AddCityButton />
        <CityCarousel />
      </div>
    </div>
  );
};
