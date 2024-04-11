import { ActiveCity, MyCityCard } from "@/entities/location";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui";
import { FC } from "react";

interface CityCarouselProps {
  cities: ActiveCity[];
  setActive: (city: ActiveCity) => void;
  activeCity: ActiveCity | null;
}

export const CityCarousel: FC<CityCarouselProps> = ({
  cities,
  setActive,
  activeCity,
}) => {
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
                setActive(city);
              }}
              activeCity={activeCity?.id === city?.id}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
