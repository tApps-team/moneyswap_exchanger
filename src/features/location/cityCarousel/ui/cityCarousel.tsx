import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui";
import { FC } from "react";
import { MyCity, MyCityCard } from "@/entities/myCity";
import { UseFormSetValue } from "react-hook-form";
import { directionSchemaType } from "@/entities/direction";

interface CityCarouselProps {
  cities: MyCity[];
  setValue: UseFormSetValue<directionSchemaType>;
}

export const CityCarousel: FC<CityCarouselProps> = ({ cities, setValue }) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
    >
      <CarouselContent>
        {cities?.map((city) => (
          <CarouselItem key={city.id}>
            <MyCityCard
              city={city}
              onClick={() => {
                setValue("activeCity", city);
                console.log("click");
              }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
