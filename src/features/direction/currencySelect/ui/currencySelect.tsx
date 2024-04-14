import { Currency, CurrencyCard } from "@/entities/direction";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
  Input,
  ScrollArea,
} from "@/shared/ui";
import { ChevronDown, Circle, Search } from "lucide-react";
import { useState } from "react";

type CurrencySelectProps = {
  currencies: Currency[];
  disabled?: boolean;
  label: string;
  emptyLabel: string;
  onClick: (currency: Currency) => void;
};
export const CurrencySelect = (props: CurrencySelectProps) => {
  const { currencies, disabled, emptyLabel, label, onClick } = props;
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          disabled={disabled}
          className="w-full bg-darkGray border border-white text-white hover:bg-mainColor justify-between items-center rounded-full gap-2 select-none"
          variant={"outline"}
        >
          <div className="flex gap-2 items-center">
            <Circle />
            <div>{label ? label : emptyLabel}</div>
          </div>
          <div className="flex ">
            <div>change</div>
            <ChevronDown />
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen">
        <DrawerHeader>
          <Input
            startAdornment={<Search className="translate-y-8 ml-2" />}
            value={searchValue}
            placeholder="Поиск валюты"
            className="rounded-xl bg-lightGray text-darkGray pl-10 focus-visible:ring-transparent focus-visible:ring-offset-0"
            onChange={(e) => setSearchValue(e.target.value.trim())}
          />
        </DrawerHeader>
        <div className="p-4">
          <ScrollArea className="h-3/5 w-full ">
            <div className="flex flex-col gap-4">
              {currencies
                ?.filter((currency) =>
                  currency.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
                )
                .map((currency) => (
                  <DrawerClose key={currency.id}>
                    <CurrencyCard
                      onClick={() => onClick(currency)}
                      currency={currency}
                    />
                  </DrawerClose>
                ))}
            </div>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
