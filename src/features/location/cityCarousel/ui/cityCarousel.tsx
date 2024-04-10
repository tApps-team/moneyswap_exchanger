import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui";
import { FC } from "react";
import { MyCity, MyCityCard } from "@/entities/myCity";

interface CityCarouselProps {
  cities: MyCity[];
  setActiveCity: (city: MyCity) => void;
}

export const CityCarousel: FC<CityCarouselProps> = ({
  cities,
  setActiveCity,
}) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
    >
      <CarouselContent className="w-[350px]">
        {cities?.map((city) => (
          <CarouselItem key={city.id}>
            <MyCityCard
              city={city}
              onClick={() => {
                setActiveCity(city);
              }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
