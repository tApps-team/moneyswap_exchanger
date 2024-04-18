import { Currency } from "@/entities/direction";
import { City, Country } from "@/entities/location";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
  Input,
  Label,
  ScrollArea,
} from "@/shared/ui";
import { Search } from "lucide-react";
import { useDeferredValue, useState } from "react";
import { ItemCard } from "./itemCard";
import { LogoButtonIcon } from "@/shared/assets";

type ItemSelectProps<T> = {
  items?: T[];
  label?: string;
  disabled?: boolean;
  emptyLabel?: string;
  inputPlaceholder?: string;
  itemIcon?: string;
  onClick?: (item: T) => void;
  inputLabel?: string;
};
export const ItemSelect = <T extends Partial<City & Country & Currency>>(
  props: ItemSelectProps<T>
) => {
  const {
    onClick,
    disabled,
    emptyLabel,
    inputPlaceholder,
    itemIcon,
    items,
    label,
    inputLabel,
  } = props;

  const [searchValue, setSearchValue] = useState<string>("");

  const defferredSearchValue = useDeferredValue(searchValue);

  const filteredItems = items?.filter((item) =>
    item.name?.toLowerCase().includes(defferredSearchValue.toLowerCase())
  );
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant={"outline"}
          disabled={disabled}
          className="w-full text-white disabled:pointer-events-none bg-darkGray h-[70px] disabled:bg-lightGray justify-between items-center rounded-full gap-2 select-none"
        >
          <div className="flex items-center gap-2 ">
            {itemIcon && (
              <img
                width={40}
                height={40}
                src={itemIcon}
                alt={`${label} icon`}
              />
            )}
            <div>{label ? label : emptyLabel}</div>
          </div>
          <LogoButtonIcon fill="#F6FF5F" width={28} height={28} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen bg-transparent border-none">
        <DrawerHeader>
          <Label className="text-mainColor text-start">{inputLabel}</Label>
          <Input
            startAdornment={<Search className="translate-y-8 ml-2" />}
            className="rounded-xl bg-lightGray text-darkGray pl-10 focus-visible:ring-transparent focus-visible:ring-offset-0"
            value={searchValue}
            placeholder={inputPlaceholder || ""}
            onChange={(e) => setSearchValue(e.target.value.trim())}
          />
        </DrawerHeader>
        <div className="p-4">
          <ScrollArea className="h-[80vh] w-full">
            <div data-vaul-no-drag className="flex flex-col gap-2">
              {filteredItems?.map((item) => (
                <DrawerClose key={item.id}>
                  <ItemCard item={item} onClick={() => onClick?.(item)} />
                </DrawerClose>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
