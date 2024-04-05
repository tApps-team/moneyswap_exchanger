import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui";
import { FC } from "react";
import { MyCity, MyCityCard } from "@/entities/myCity";

interface CityCarouselProps {
  cities: MyCity[];
}

export const CityCarousel: FC<CityCarouselProps> = ({ cities }) => {
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
              onClick={() => console.log("city card click")}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
