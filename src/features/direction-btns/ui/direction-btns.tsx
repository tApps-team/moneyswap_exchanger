import { Banknote, CreditCard } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface DirectionBtnsProps {
    isNoncash: boolean
    setNonCash: () => void;
    setCash: () => void;
  }

export const DirectionBtns:FC<DirectionBtnsProps> = ({isNoncash, setNonCash, setCash}) => {
    const {t} = useTranslation()
  return (
      <ul className="grid grid-cols-2 gap-4 w-full mb-8">
        <li 
          className={`cursor-pointer flex flex-row justify-center items-center gap-2 py-3.5 px-2 rounded-[7px] mobile:text-base text-sm font-medium text-center text-black ${isNoncash ? "bg-lightGray" : "bg-mainColor"}`} 
          onClick={setCash}
        >
          <div className="[&>svg]:size-5">
            <Banknote />
          </div>
          <p className="truncate">{t("Наличные")}</p>
        </li>
        <li 
          className={`cursor-pointer flex flex-row justify-center items-center gap-2 py-3.5 px-2 rounded-[7px] mobile:text-base text-sm font-medium text-center text-black ${isNoncash ? "bg-mainColor" : "bg-lightGray"}`} 
          onClick={setNonCash}
        >
          <div className="[&>svg]:size-5">
            <CreditCard />
          </div>
          <p className="truncate">{t("Безналичные")}</p>
        </li>
      </ul>
  );
};