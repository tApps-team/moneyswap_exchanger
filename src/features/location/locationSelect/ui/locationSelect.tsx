import { City, CityCard, Country, CountryCard } from "@/entities/location";
import { locationSchemaType } from "@/pages/locationSettings/ui/locationSettingsPage";
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
            <CityCard
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
            <CountryCard
              country_icon={country.country_icon}
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
// type LocationSelectRefactoringProps = {
//   label?: string;
// } & (SelectCities | SelectCountry);
// //Todo(refactoring) либо можно создать универсальный компонент которой будет рендерить универсальные карточки, если различия между карточкой города и страны только в иконке
// export const LocationSelectRefactoring = (
//   props: LocationSelectRefactoringProps
// ) => {
//   const { type, onClick, label } = props;

//   const cityItem = type === "city" ? props.city : null;
//   const countryItem = type === "country" ? props.country : null;

//   const emptyLabel = type === "city" ? "Выберите город" : "Выберите страну";
//   const selectName = type === "city" ? "Город" : "Страна";

//   const locationItems =
//     type === "city"
//       ? cityItem?.map((city) => (
//           <DrawerClose key={city.id}>
//             <CityCard
//               code_name={city.code_name}
//               id={city.id}
//               name={city.name}
//               onClick={() => onClick(city)}
//             />
//           </DrawerClose>
//         ))
//       : countryItem?.map((country) => (
//           <DrawerClose key={country.id}>
//             <CountryCard
//               country_icon={country.country_icon}
//               id={country.id}
//               name={country.name}
//               onClick={() => onClick(country)}
//             />
//           </DrawerClose>
//         ));

//   return (
//     <div>
//       <div>{selectName}</div>
//       <Drawer>
//         <DrawerTrigger asChild>
//           <Button
//             className="w-full justify-between items-center rounded-full gap-2 select-none"
//             variant={"outline"}
//           >
//             <div className="flex gap-2 items-center">
//               <Circle />
//               <div>{label ? label : emptyLabel}</div>
//             </div>
//             <div className="flex ">
//               <div>change</div>
//               <ChevronDown />
//             </div>
//           </Button>
//         </DrawerTrigger>
//         <DrawerContent className="h-screen">
//           <DrawerHeader>
//             <DrawerTitle>
//               Выберите страну в которой будет размещен обменик
//             </DrawerTitle>
//             <DrawerDescription>это можно будет изменить</DrawerDescription>
//           </DrawerHeader>
//           <div className="p-4">
//             <ScrollArea className="h-[320px] w-full ">
//               <div className="flex flex-col gap-4">{locationItems}</div>
//             </ScrollArea>
//           </div>
//         </DrawerContent>
//       </Drawer>
//     </div>
//   );
// };
