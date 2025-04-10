import { Link } from "react-router-dom";
import { paths } from "@/shared/routing";
import { PlusIcon } from "@/shared/assets";

export const AddNonCashDirection = () => {
  return (
    <Link to={paths.directionAdd} className="cursor-pointer flex justify-center items-center size-[70px] bg-darkGray text-mainColor rounded-full border-2 border-lightGray">
        <PlusIcon fill="#F6FF5F" className="size-5"/>
    </Link>
  );
};