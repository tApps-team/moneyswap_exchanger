import {
  Direction,
  DirectionCard,
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
  citiesLoading: boolean;
}

export const DirectionList: FC<DirectionListProps> = ({
  directions,
  form,
  directionsLoading,
  citiesLoading,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mt-2 grid gap-3 overflow-auto">
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

      {!directions.length && <Empty text={t("Список пуст")} />}
    </div>
  );
};
