import { Button } from "@/shared/ui";

export const DeleteDirection = () => {
  const handleClick = () => {
    console.log("delete");
  };
  return (
    <Button onClick={handleClick} variant={"destructive"}>
      Delete
    </Button>
  );
};
