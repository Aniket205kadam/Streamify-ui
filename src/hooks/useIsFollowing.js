import userService from "../services/userService";

const useIsFollowing = (followingId, token) => {
    return userService.isFollowingUser(followingId, token);
}

export default useIsFollowing;