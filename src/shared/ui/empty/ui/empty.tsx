import { EmptyIcon } from "@/shared/assets";

export const Empty = (props: { text?: string }) => {
  return (
    <div className="flex justify-center items-center mt-10">
      <EmptyIcon className="w-[55vw] h-[55vw]" />
      <p>{props.text}</p>
    </div>
  );
};
