import { BackIcon } from "@/shared/assets";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(-1)}>
      <BackIcon />
    </div>
  );
};
