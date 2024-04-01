import { AddCityButton, CityCarousel } from "@/features/location";

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
