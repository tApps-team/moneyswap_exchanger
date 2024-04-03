import { Button } from "@/shared/ui";

export const EditDirection = () => {
  const handleClick = () => {
    console.log("Edit");
  };
  return (
    <Button onClick={handleClick} variant={"destructive"}>
      Edit
    </Button>
  );
};
