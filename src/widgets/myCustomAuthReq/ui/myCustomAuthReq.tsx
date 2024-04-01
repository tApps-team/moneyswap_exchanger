import Cookies from "js-cookie";
import { testAPI } from "../api/testService";

export const MyCustomAuthReq = () => {
  const { data, isLoading, error } = testAPI.useTestGetQuery("");

  // const refreshBody = JSON.stringify({
  //   refresh_token: Cookies.get("refreshToken"),
  // });

  // const handleClick = async () => {
  //   try {
  //     const result = await fetch(
  //       `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: refreshBody,
  //       }
  //     ).then((data) => console.log(data));
  //     console.log(result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {data && (
            <div>
              {data.exchange} | {data.pk} | {data.user}
            </div>
          )}
          {error && "ОШИБКА!!!"}
        </div>
      )}
    </>
    // <div>
    //   <button onClick={handleClick}>click!</button>
    // </div>
  );
};
