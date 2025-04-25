import { CreditCard, MapPinned } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DirectionAddForm } from "@/widgets/directionAddForm";
import styles from "./directionAddPage.module.scss";
import { useAppSelector } from "@/shared/model";

type Language = 'ru' | 'en';

export const DirectionAddPage = () => {
  const { activeLocation, nonCash } = useAppSelector(
    (state) => state.activeLocation
  );
  const { i18n, t } = useTranslation();
  return (
    <div>
      <div className={styles.container}></div>
      <div className="mb-8 -mt-4 flex justify-center items-center gap-3 bg-darkGray border-[1px] border-lightGray/70 text-mainColor rounded-[10px] w-fit mx-auto py-2 px-4">
        <div className="[&>svg]:size-5">
          {nonCash ? <CreditCard /> : <MapPinned />}
        </div>
        <p className="truncate text-base font-medium text-center">{nonCash ? t("Безналичные") : activeLocation?.name[i18n.language as Language]}</p>
      </div>
      <DirectionAddForm />
    </div>
  );
};
