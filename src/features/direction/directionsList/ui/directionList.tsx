import {
  Direction,
  DirectionCard,
  directionSchemaType,
} from "@/entities/direction";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { DirectionSkeleton } from "./directionSkeleton";

interface DirectionListProps {
  directions: Direction[];
  form: UseFormReturn<directionSchemaType>;
  directionsLoading: boolean;
  citiesLoading: boolean;
}

export const DirectionList: FC<DirectionListProps> = ({
  directions,
  form,
  directionsLoading,
  citiesLoading,
}) => {
  return (
    <div className="mt-2 grid gap-3 overflow-auto max-h-[35vh]">
      {directionsLoading || citiesLoading ? (
        <>
          <DirectionSkeleton />
          <DirectionSkeleton />
          <DirectionSkeleton />
        </>
      ) : (
        directions.map((direction, index) => (
          <DirectionCard
            form={form}
            key={direction.id}
            direction={direction}
            index={index}
          />
        ))
      )}
    </div>
  );
};
