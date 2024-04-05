import { Direction, directionAPI } from "@/entities/direction";
import { MyCity } from "@/entities/myCity";
import { CreateDirection, DirectionList } from "@/features/direction";
import { useAppSelector } from "@/shared/model";
import { FC } from "react";

// interface DirectionsProps {
//   directions: Direction[];
// }

// export const Directions: FC<DirectionsProps> = ({ directions }) => {
//   return (
//     <div className="mt-5 mb-5 grid grid-flow-row gap-5">
//       <div className="text-2xl">Мои направления</div>
//       <CreateDirection />
//       <DirectionList directions={directions} />
//     </div>
//   );
// };

interface DirectionsProps {}

export const Directions: FC<DirectionsProps> = () => {
  const activeCity = useAppSelector((state) => state.myCity.activeCity);

  if (!activeCity) {
    return <div>Выберите город</div>;
  }

  const {
    data: directions,
    isLoading: directionsLoading,
    error: directionsError,
  } = directionAPI.useDirectionsByCityQuery(activeCity.code_name);

  if (directionsLoading || !directions) {
    return <div>Loading directions...</div>;
  }

  return (
    <div className="mt-5 mb-5 grid grid-flow-row gap-5">
      <div className="text-2xl">Мои направления</div>
      <CreateDirection />
      <DirectionList directions={directions} />
    </div>
  );
};
