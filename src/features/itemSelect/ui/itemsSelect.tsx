import { Currency } from "@/entities/direction";
import { City, Country } from "@/entities/location";
import { LogoButtonIcon } from "@/shared/assets";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
  Empty,
  Input,
  Label,
  ScrollArea,
} from "@/shared/ui";
import { Search } from "lucide-react";
import { useDeferredValue, useState } from "react";
import { ItemCard } from "./itemCard";

type ItemSelectProps<T> = {
  items?: T[];
  label?: string;
  disabled?: boolean;
  emptyLabel?: string;
  inputPlaceholder?: string;
  itemIcon?: string;
  onClick?: (item: T) => void;
  inputLabel?: string;
  scrollRestore?: () => void;
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const defferredSearchValue = useDeferredValue(searchValue);

  const filteredItems = items?.filter((item) =>
    item.name?.toLowerCase().includes(defferredSearchValue.toLowerCase())
  );
  const handleScrollToTop = () => {
    window.scrollTo({ left: 0, top: 0 });
  };
  // useLayoutEffect(() => {
  //   window.scrollTo({ left: 0, top: 0 });
  // }, [drawerOpen]);
  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger onClick={handleScrollToTop} asChild>
        <Button
          disabled={disabled}
          className="rounded-[35px] w-full truncate font-light  text-white disabled:pointer-events-none bg-darkGray disabled:bg-[#606060] disabled:opacity-100  justify-between items-center  gap-2 select-none"
        >
          <div className="flex items-center gap-2 truncate">
            {itemIcon && (
              <img
                width={34}
                height={34}
                src={itemIcon}
                alt={`${label} icon`}
                className="rounded-full overflow-hidden"
              />
            )}
            <div className="uppercase truncate text-sm sm:text-base">
              {label ? label : emptyLabel}
            </div>
          </div>
          <div className="w-[28px] h-[28px]">
            <LogoButtonIcon fill="#F6FF5F" width={28} height={28} />
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[100svh] bg-transparent border-none">
        <DrawerHeader className="gap-0">
          <div className="flex items-center justify-between">
            <Label className="text-mainColor text-start">{inputLabel}</Label>
            <DrawerClose>
              <LogoButtonIcon width={26} height={26} />
            </DrawerClose>
          </div>
          <Input
            startAdornment={<Search className="translate-y-8 ml-2" />}
            className="rounded-xl text-base bg-lightGray text-darkGray pl-10 focus-visible:ring-transparent focus-visible:ring-offset-0 placeholder:text-darkGray placeholder:text-opacity-50"
            value={searchValue}
            placeholder={inputPlaceholder || ""}
            onChange={(e) => setSearchValue(e.target.value.trim())}
          />
        </DrawerHeader>

        <ScrollArea data-vaul-no-drag className="h-full p-4 w-full">
          <div className="grid grid-rows-1 items gap-2 p-2">
            {filteredItems?.length ? (
              filteredItems?.map((item) => (
                <DrawerClose key={item.id} asChild>
                  <ItemCard item={item} onClick={() => onClick?.(item)} />
                </DrawerClose>
              ))
            ) : (
              <Empty text="Список пуст..." />
            )}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};
