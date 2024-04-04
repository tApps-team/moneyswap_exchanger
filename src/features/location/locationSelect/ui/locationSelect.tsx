import { City, Country, LocationCard } from "@/entities/location";
import { List } from "@/features/list";
import { locationSchemaType } from "@/pages/locationAdd/ui/locationAddPage";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Input,
  ScrollArea,
} from "@/shared/ui";
import { ChevronDown, Circle } from "lucide-react";
import { useFormContext } from "react-hook-form";

type SelectCities = {
  type: "city";
  city: City[];
  // onClick: (location: City) => void;
};
type SelectCountry = {
  type: "country";
  country?: Country[];
  // onClick: (location: Country) => void;
};
type LocationSelectProps = {
  label?: string;
} & (SelectCities | SelectCountry);
//Todo(refactoring) либо можно создать универсальный компонент которой будет рендерить универсальные карточки, если различия между карточкой города и страны только в иконке
export const LocationSelect = (props: LocationSelectProps) => {
  const { type, label } = props;
  const form = useFormContext<locationSchemaType>();

  const cityItem = type === "city" ? props.city : null;
  const countryItem = type === "country" ? props.country : null;

  const emptyLabel = type === "city" ? "Выберите город" : "Выберите страну";
  const selectName = type === "city" ? "Город" : "Страна";
  console.log(form.getValues("city"));
  const locationItems =
    type === "city"
      ? cityItem?.map((city) => (
          <DrawerClose key={city.id}>
            <LocationCard
              code_name={city.code_name}
              id={city.id}
              name={city.name}
              onClick={() => {
                form.setValue("city", city.name);
              }}
            />
          </DrawerClose>
        ))
      : countryItem?.map((country) => (
          <DrawerClose key={country.id}>
            <LocationCard
              country_flag={country.country_flag}
              id={country.id}
              name={country.name}
              onClick={() => form.setValue("country", country.name)}
            />
          </DrawerClose>
        ));

  return (
    <div>
      <div>{selectName}</div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className="w-full justify-between items-center rounded-full gap-2 select-none"
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
            <DrawerTitle>
              Выберите страну в которой будет размещен обменик
            </DrawerTitle>
            <DrawerDescription>это можно будет изменить</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <ScrollArea className="h-[320px] w-full ">
              <div className="flex flex-col gap-4">{locationItems}</div>
            </ScrollArea>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

type LocationSelectRefactoringProps = {
  label?: { locationName: string; icon: string };
  emptyLabel?: string;
  type: "city" | "country";
  location: (City & Country)[];
  onClick: () => void;
};
//Todo(refactoring) либо можно создать универсальный компонент которой будет рендерить универсальные карточки, если различия между карточкой города и страны только в иконке
export const LocationSelectRefactoringProps = (
  props: LocationSelectRefactoringProps
) => {
  const { location, onClick, type, emptyLabel, label } = props;
  const label = label ? <div>
    
  </div>
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          className="w-full justify-between items-center rounded-full gap-2 select-none"
          variant={"outline"}
        >
          <div>
            {cityLabel}
            {countryLabel}
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <Input />
        </DrawerHeader>
        <div className="p-4">
          <ScrollArea className="h-[320px] w-full ">
            <div className="flex flex-col gap-4">{itemsRender}</div>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
