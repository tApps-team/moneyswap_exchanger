import { Direction, directionSchemaType } from "@/entities/direction";
import { CreateDirection, DirectionList } from "@/features/direction";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import styles from "./directions.module.scss";
import { useTranslation } from "react-i18next";

interface DirectionsProps {
  form: UseFormReturn<directionSchemaType>;
  directions: Direction[];
  directionsLoading: boolean;
  citiesLoading: boolean;
}

export const Directions: FC<DirectionsProps> = ({
  form,
  directions,
  directionsLoading,
  citiesLoading,
}) => {
  const { t } = useTranslation();
  return (
    <div className="mt-8 mb-8 grid grid-flow-row gap-5">
      <h2 className={styles.title}>{t("Мои направления")}</h2>
      <CreateDirection />
      <DirectionList
        directionsLoading={directionsLoading}
        citiesLoading={citiesLoading}
        form={form}
        directions={directions}
      />
    </div>
  );
};
