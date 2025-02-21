import { useSelector } from "react-redux";

const useConnectedUser = () => {
  return useSelector((state) => state.authentication);
};

export default useConnectedUser;
