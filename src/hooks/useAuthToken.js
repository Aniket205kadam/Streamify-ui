import { useSelector } from "react-redux";

const useAuthToken = () => {
  return useSelector((state) => state.authentication.authToken);
};

export default useAuthToken;
