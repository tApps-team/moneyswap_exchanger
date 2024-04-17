import { Direction, directionSchemaType } from "@/entities/direction";
import { CreateDirection, DirectionList } from "@/features/direction";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import styles from "./directions.module.scss";
import { DirectionListSkeleton } from "@/features/direction/directionsList";

interface DirectionsProps {
  form: UseFormReturn<directionSchemaType>;
  directions: Direction[] | undefined;
  isLoading: boolean;
}

export const Directions: FC<DirectionsProps> = ({
  form,
  directions,
  isLoading,
}) => {
  return (
    <div className="mt-5 mb-5 grid grid-flow-row gap-5">
      <h2 className={styles.title}>Мои направления</h2>
      <CreateDirection />
      {isLoading ? (
        <DirectionListSkeleton />
      ) : (
        directions && <DirectionList form={form} directions={directions} />
      )}
    </div>
  );
};
