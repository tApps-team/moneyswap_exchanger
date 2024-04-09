import { Currency } from "@/entities/direction/model/types";
import {
  City,
  Country,
  LocationCard,
  LocationSchemaType,
} from "@/entities/location";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  ScrollArea,
} from "@/shared/ui";
import { ChevronDown, Circle } from "lucide-react";
import { UseFormSetValue } from "react-hook-form";

type SelectCities = {
  type: "city";
  city: City[];
};
type SelectCountry = {
  type: "country";
  country?: Country[];
};
type LocationSelectProps = {
  label?: string;
  disabled?: boolean;
  setValue: UseFormSetValue<LocationSchemaType>;
} & (SelectCities | SelectCountry);
//Todo(refactoring) либо можно создать универсальный компонент которой будет рендерить универсальные карточки, если различия между карточкой города и страны только в иконке
export const LocationSelect = (props: LocationSelectProps) => {
  const { type, label, disabled, setValue } = props;

  const cityItem = type === "city" ? props.city : null;
  const countryItem = type === "country" ? props.country : null;

  const emptyLabel = type === "city" ? "Выберите город" : "Выберите страну";
  const selectName = type === "city" ? "Город" : "Страна";

  const locationItems =
    type === "city"
      ? cityItem?.map((city) => (
          <DrawerClose key={city.id}>
            <LocationCard
              code_name={city.code_name}
              id={city.id}
              name={city.name}
              onClick={() => {
                setValue("city", city.name);
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
              onClick={() => setValue("country", country.name)}
            />
          </DrawerClose>
        ));

  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            disabled={disabled}
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
// type LocationSelectTestProps<T extends City | Currency | Country> = {
//   onClick: () => void;
//   disabled?: boolean;
//   label: string;
//   emptyLabel: string;
//   items: T[];
// };
// export const LocationSelectTest = <T extends City | Currency | Country>(
//   props: LocationSelectTestProps<T>
// ) => {
//   const { disabled, items, label, onClick, emptyLabel } = props;

//   return (
//     <Drawer>
//       <DrawerTrigger asChild>
//         <Button
//           disabled={disabled}
//           className="w-full justify-between items-center rounded-full gap-2 select-none"
//           variant={"outline"}
//         >
//           <div className="flex gap-2 items-center">
//             <Circle />
//             <div>{label ? label : emptyLabel}</div>
//           </div>
//           <div className="flex ">
//             <div>change</div>
//             <ChevronDown />
//           </div>
//         </Button>
//       </DrawerTrigger>
//       <DrawerContent className="h-screen">
//         <DrawerHeader>
//           <DrawerTitle>
//             Выберите страну в которой будет размещен обменик
//           </DrawerTitle>
//           <DrawerDescription>это можно будет изменить</DrawerDescription>
//         </DrawerHeader>
//         <div className="p-4">
//           <ScrollArea className="h-[320px] w-full ">
//             <div className="flex flex-col gap-4">
//               {items.map((item) => (
//                 <DrawerClose key={item.id}>
//                   <LocationCard
//                     code_name={item.code_name}
//                     id={item.id}
//                     name={item.name}
//                     onClick={onClick}
//                   />
//                 </DrawerClose>
//               ))}
//             </div>
//           </ScrollArea>
//         </div>
//       </DrawerContent>
//     </Drawer>
//   );
// };
