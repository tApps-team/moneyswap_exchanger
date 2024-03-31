import { City, CityCardProps, Country } from "@/entities/location";
import {
  Button,
  Card,
  CardContent,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  ScrollArea,
} from "@/shared/ui";
import { ChevronDown, Circle } from "lucide-react";
const CountryCard = (props: CityCardProps) => {
  const { code_name, id, imageUrl, name } = props;
  return (
    <Card className="cursor-pointer">
      <CardContent className="flex gap-2">
        <div>image</div>
        <div>{name}</div>
      </CardContent>
    </Card>
  );
};
const cities: CityCardProps[] = [
  {
    code_name: "BAN",
    id: 1,
    imageUrl: "asdfsadfsaf",
    name: "Багкок",
  },
  {
    code_name: "BAN",
    id: 2,
    imageUrl: "asdfsadfsaf",
    name: "Багкок",
  },
  {
    code_name: "BAN",
    id: 3,
    imageUrl: "asdfsadfsaf",
    name: "Багкок",
  },
  {
    code_name: "BAN",
    id: 4,
    imageUrl: "asdfsadfsaf",
    name: "Багкок",
  },
  {
    code_name: "BAN",
    id: 5,
    imageUrl: "asdfsadfsaf",
    name: "Багкок",
  },
  {
    code_name: "BAN",
    id: 6,
    imageUrl: "asdfsadfsaf",
    name: "Багкок",
  },
  {
    code_name: "BAN",
    id: 7,
    imageUrl: "asdfsadfsaf",
    name: "Багкок",
  },
  {
    code_name: "BAN",
    id: 8,
    imageUrl: "asdfsadfsaf",
    name: "Багкок",
  },
  {
    code_name: "BAN",
    id: 9,
    imageUrl: "asdfsadfsaf",
    name: "Багкок",
  },
  {
    code_name: "BAN",
    id: 10,
    imageUrl: "asdfsadfsaf",
    name: "Багкок",
  },
];
type CountrySelectProps = {
  type?: "city" | "country";
  city?: City[];
  country?: Country[];
};
export const CountrySelect = (props: CountrySelectProps) => {
  const { city, country, type } = props;
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          className="w-full justify-between items-center rounded-full gap-2 select-none"
          variant={"outline"}
        >
          <div className="flex gap-2 items-center">
            <Circle />
            <div>Тайланд</div>
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
          <ScrollArea className="h-screen w-full ">
            <div className="flex flex-col gap-4">
              {cities.map((city) => (
                <DrawerClose key={city.id}>
                  <CountryCard
                    code_name={city.code_name}
                    id={city.id}
                    imageUrl={city.imageUrl}
                    name={city.name}
                  />
                </DrawerClose>
              ))}
            </div>
          </ScrollArea>
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Выйти</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
