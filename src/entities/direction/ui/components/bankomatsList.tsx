import { Bankomat } from "@/entities/direction";

interface BankomatsListProps {
  bankomats: Bankomat[];
}

export const BankomatsList: React.FC<BankomatsListProps> = ({ bankomats }) => {
  if (!bankomats || bankomats.length === 0) return null;

  return (
    <div className="absolute top-full mt-[26px] left-0 w-full justify-start inline-flex flex-wrap flex-row gap-1 cursor-pointer">
      {bankomats.map((bank) => (
        <div
          key={bank?.id}
          className="rounded-full overflow-hidden w-4 h-4 flex-shrink-0 cursor-pointer"
        >
          <img src={bank?.icon} alt="icon" className="w-4 h-4" />
        </div>
      ))}
    </div>
  );
}; 