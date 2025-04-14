import {
  Direction,
  DirectionNewCard,
  directionSchemaType,
} from "@/entities/direction";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { DirectionSkeleton } from "./directionSkeleton";
import { Empty } from "@/shared/ui";
import { useTranslation } from "react-i18next";

interface DirectionListProps {
  directions: Direction[];
  form: UseFormReturn<directionSchemaType>;
  directionsLoading: boolean;
  locationsLoading: boolean;
}

export const DirectionList: FC<DirectionListProps> = ({
  directions,
  form,
  directionsLoading,
  locationsLoading,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mt-2 grid gap-3 overflow-auto">
      {directionsLoading || locationsLoading ? (
        <>
          <DirectionSkeleton />
          <DirectionSkeleton />
          <DirectionSkeleton />
        </>
      ) : (
        directions.map((direction, index) => (
           <DirectionNewCard
            form={form}
            key={direction.id}
            direction={direction}
            index={index}
          /> 
        ))
      )}

      {!directions.length && <Empty text={t("Список пуст")} />}
    </div>
  );
};
