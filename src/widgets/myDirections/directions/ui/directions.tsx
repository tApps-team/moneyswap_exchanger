import { Direction, directionSchemaType } from "@/entities/direction";
import { CreateDirection, DirectionList } from "@/features/direction";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import styles from "./directions.module.scss";
import { useTranslation } from "react-i18next";
import { useToast } from "@/shared/ui";
import { LanguageSwitcherSmall } from "@/features/languageSwitchSmall";

interface DirectionsProps {
  form: UseFormReturn<directionSchemaType>;
  directions: Direction[];
  directionsLoading: boolean;
  locationsLoading: boolean;
  isActive: boolean;
  isNoncash: boolean;
}

export const Directions: FC<DirectionsProps> = ({
  form,
  directions,
  directionsLoading,
  locationsLoading,
  isActive,
  isNoncash,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const handleCreateDirection = () => {
    if (!isActive) {
      toast({
        title: t(
          "Чтобы добавить новое направление укажите город или страну."
        ),
        description: t(
          "Для добавления безналичного направления, выберите 'Безналичные'"
        ),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-8 mb-8 grid grid-flow-row gap-5">
      <div className="flex items-center justify-between gap-2 ">
        <h2 className={`truncate ${styles.title}`}>{t("Мои направления")}</h2>
        {isNoncash && <LanguageSwitcherSmall />}
      </div>
      <div onClick={handleCreateDirection}>
        <CreateDirection disabled={!isActive} />
      </div>
      <DirectionList
        directionsLoading={directionsLoading}
        locationsLoading={locationsLoading}
        form={form}
        directions={directions}
      />
    </div>
  );
};
