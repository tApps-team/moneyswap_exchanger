import { ReactNode } from "react";

type ListProps<T> = {
  items: T[];
  renderItem: (item: T)
};
export const List = <T extends object>(props: ListProps<T>) => {
  const { items, renderItem } = props;
  return (
    <div>
      {items?.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </div>
  );
};
