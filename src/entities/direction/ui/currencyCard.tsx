import { Card, CardContent } from "@/shared/ui";
import { Currency } from "../model/types";

type CurrencyCardProps = {
  currency: Currency;
  onClick?: () => void;
};
export const CurrencyCard = (props: CurrencyCardProps) => {
  const { currency, onClick } = props;
  return (
    <Card
      onClick={onClick}
      className="p-4 cursor-pointer rounded-full border-2 border-white bg-gray-600"
    >
      <CardContent className="p-0 flex gap-2 items-center  text-white">
        <img
          src={currency.icon_url}
          alt={`currency ${currency.name}`}
          width={32}
          height={32}
        />
        <div>{currency.name}</div>
      </CardContent>
    </Card>
  );
};
