import { Currency } from "@/entities/direction";
import { City, Country, LocationCard } from "@/entities/location";
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
import { ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";

type SelectCities = {
  type: "city";
  city?: City[];
  inputPlaceholderCity?: string;
  onClick?: (city: City) => void;
};
type SelectCountry = {
  type: "country";
  country?: Country[];
  countryIcon?: string;
  inputPlaceholderCountry?: string;
  onClick?: (country: Country) => void;
};
type LocationSelectProps = {
  label?: string;
  disabled?: boolean;
} & (SelectCities | SelectCountry);
//Todo(refactoring) либо можно создать универсальный компонент которой будет рендерить универсальные карточки, если различия между карточкой города и страны только в иконке
export const LocationSelect = (props: LocationSelectProps) => {
  const { type, label, disabled } = props;
  const [searchValue, setSearchValue] = useState<string>("");

  const cityItem = type === "city" ? props.city : null;
  const countryItem = type === "country" ? props.country : null;

  const emptyLabel = type === "city" ? "Выберите город" : "Выберите страну";

  const placeholder =
    type === "city"
      ? props.inputPlaceholderCity
      : props.inputPlaceholderCountry;
  const locationItems = useMemo(
    () =>
      type === "city"
        ? cityItem
            ?.filter((city) =>
              city.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((city) => (
              <DrawerClose key={city.id}>
                <LocationCard
                  code_name={city.code_name}
                  id={city.id}
                  name={city.name}
                  onClick={() => props.onClick && props?.onClick(city)}
                />
              </DrawerClose>
            ))
        : countryItem
            ?.filter((country) =>
              country.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((country) => (
              <DrawerClose key={country.id}>
                <LocationCard
                  country_flag={country.country_flag}
                  id={country.id}
                  name={country.name}
                  onClick={() => props.onClick && props.onClick(country)}
                />
              </DrawerClose>
            )),
    [cityItem, countryItem, props, searchValue, type]
  );

  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            disabled={disabled}
            className="w-full  text-white hover:bg-mainColor disabled:pointer-events-none bg-darkGray h-14 disabled:bg-lightGray justify-between items-center rounded-full gap-2 select-none"
            variant={"outline"}
          >
            <div className="flex gap-2 items-center">
              {type === "country" && props.countryIcon ? (
                <img
                  width={32}
                  height={32}
                  src={props.countryIcon}
                  alt={`country ${props.label}`}
                />
              ) : null}
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
              className="rounded-xl bg-lightGray text-darkGray pl-10 focus-visible:ring-transparent focus-visible:ring-offset-0"
              value={searchValue}
              placeholder={placeholder || ""}
              onChange={(e) => setSearchValue(e.target.value.trim())}
            />
          </DrawerHeader>
          <div className="p-4">
            <ScrollArea className="h-[420px] w-full ">
              <div className="flex flex-col gap-4">{locationItems}</div>
            </ScrollArea>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
type LocationSelectRefatoringProps<
  T extends Partial<City & Country & Currency>
> = {
  items?: T[];
  label?: string;
  disabled?: boolean;
  emptyLabel?: string;
  inputPlaceholder?: string;
  locationIcon?: string;
  onClick: (location: T) => void;
};
export const LocationSelectRefatoring = <
  T extends Partial<City & Country & Currency>
>(
  props: LocationSelectRefatoringProps<T>
) => {
  const {
    items,
    disabled,
    label,
    onClick,
    locationIcon,
    emptyLabel,
    inputPlaceholder,
  } = props;

  const [searchValue, setSearchValue] = useState<string>("");

  const filtereditems = useMemo(
    () =>
      items?.filter((item) =>
        item.name?.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [items, searchValue]
  );
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          disabled={disabled}
          className="w-full  text-white hover:bg-mainColor disabled:pointer-events-none bg-darkGray h-14 disabled:bg-lightGray justify-between items-center rounded-full gap-2 select-none"
          variant={"outline"}
        >
          <div className="flex gap-2 items-center">
            {locationIcon && (
              <img
                width={32}
                height={32}
                src={locationIcon}
                alt={"country icon"}
              />
            )}
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
            className="rounded-xl bg-lightGray text-darkGray pl-10 focus-visible:ring-transparent focus-visible:ring-offset-0"
            value={searchValue}
            placeholder={inputPlaceholder || ""}
            onChange={(e) => setSearchValue(e.target.value.trim())}
          />
        </DrawerHeader>
        <div className="p-4">
          <ScrollArea className="h-[420px] w-full ">
            <div className="flex flex-col gap-4">
              {filtereditems?.map((item) => (
                <DrawerClose key={item.id}>
                  <LocationCard
                    key={item.id}
                    code_name={item.code_name}
                    country_flag={item.country_flag}
                    id={item.id}
                    name={item.name}
                    onClick={() => onClick(item)}
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
