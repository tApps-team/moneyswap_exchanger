import { Button } from "@/shared/ui";
import { Link, useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();

  return <Button onClick={() => navigate(-1)}>Назад</Button>;
};
