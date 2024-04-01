import { userSlice } from "@/entities/user";
import { authAPI } from "@/entities/user/api/authService";
import { useAppDispatch } from "@/shared/model/hooks";
import { paths } from "@/shared/routing";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const MyCustomLogin = () => {
  const [Login, { isLoading, error }] = authAPI.useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const result = await Login(formData);
      if ("data" in result) {
        const tokenData = result.data;
        dispatch(userSlice.actions.login(tokenData));
        navigate(paths.home);
      } else {
        console.error("Ошибка получения токена:", result.error);
      }
    } catch (error) {
      console.log("ОШИБКА: ", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <input
            type="text"
            placeholder="username..."
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="password..."
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button onClick={handleLogin}>Login</button>
          {error && "ОШИБКА"}
        </div>
      )}
    </>
  );
};
