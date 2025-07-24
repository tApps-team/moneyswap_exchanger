import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface TelegramLinkBtnProps {
  link: string;
  text: string;
  icon: React.ReactNode;
  target?: boolean;
  onClick?: () => void;
}

export const TelegramLinkBtn: FC<TelegramLinkBtnProps> = ({
  link,
  text,
  icon,
  target,
  onClick,
}) => {
  const { t } = useTranslation();
  return (
    <Link to={link} target={target ? "_blank" : "_self"} onClick={onClick} className="hover:scale-[1.025] transition-all duration-300 grid grid-flow-col gap-2 justify-center items-center h-[60px] rounded-xl mobile-xs:text-base text-sm font-semibold uppercase bg-mainColor text-darkGray px-4 py-2">
      <div>{icon}</div>
      <div>{t(text)}</div>
    </Link>
  );
};
