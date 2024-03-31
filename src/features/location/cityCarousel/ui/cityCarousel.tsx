import { CityCard, CityCardProps } from "@/entities/location";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui";
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
];
export const CityCarousel = () => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {cities.map((city) => (
          <CarouselItem
            className="basis-8/12 "
            //md:basis-1/2 lg:basis-8/12 sm:basis-11/12
            key={city.id}
          >
            <CityCard
              code_name={city.code_name}
              id={city.id}
              name={city.name}
              imageUrl={city.imageUrl}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
