import { Direction, DirectionCard } from "@/entities/direction";
import { FC } from "react";

interface DirectionListProps {
  directions: Direction[];
}

export const DirectionList: FC<DirectionListProps> = ({ directions }) => {
  return (
    <div>
      {directions.map((direction) => (
        <DirectionCard key={direction.id} direction={direction} />
      ))}
    </div>
  );
};
