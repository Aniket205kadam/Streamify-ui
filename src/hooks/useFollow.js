import { toast } from "react-toastify";
import userService from "../services/userService"

const useFollow = async (username, followingId, authToken) => {
    const followResponse = await userService.followUser(followingId, authToken);
    if (!followResponse.success) {
        toast.error(followResponse.error);
        return;
    }
    toast.success(`You have successfully followed ${username}!`);
}

export default useFollow;