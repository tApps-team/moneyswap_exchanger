import { MyCity, myCityAPI, myCitySlice } from "@/entities/myCity";
import { Cities } from "../cities";
import { Directions } from "../directions";
import { directionAPI } from "@/entities/direction";
import { useAppDispatch, useAppSelector } from "@/shared/model";

export const MyDirections = () => {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector((state) => state.myCity.activeCity);
  const {
    data: cities,
    isLoading: citiesLoading,
    error: citiesError,
  } = myCityAPI.useGetCitiesQuery("");

  if (citiesLoading || !cities) {
    return <div>Loading cities...</div>;
  }

  dispatch(myCitySlice.actions.setMyCity(cities[0]));

  return (
    <div>
      <Cities cities={cities} />
      <Directions />
    </div>
  );
};
