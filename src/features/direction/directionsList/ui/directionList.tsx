import {
  Direction,
  DirectionCard,
  directionSchemaType,
} from "@/entities/direction";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";

interface DirectionListProps {
  directions: Direction[];
  form: UseFormReturn<directionSchemaType>;
}

export const DirectionList: FC<DirectionListProps> = ({ directions, form }) => {
  return (
    <div className="mt-2 grid gap-3 overflow-auto max-h-[50vh]">
      {directions.map((direction, index) => (
        <DirectionCard
          form={form}
          key={direction.id}
          direction={direction}
          index={index}
        />
      ))}
    </div>
  );
};
