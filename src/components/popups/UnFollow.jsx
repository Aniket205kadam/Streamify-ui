import React from "react";
import "./UnFollow.scss";
import useConnectedUser from "../../hooks/useConnectedUser";
import userService from "../../services/userService";
import { toast } from "react-toastify";

function UnFollow({ user, closeHander }) {
  const connectedUser = useConnectedUser();

  console.log(user);

  const unfollowHandler = async () => {
    const response = await userService.unfollowUser(
      user.id,
      connectedUser.authToken
    );
    if (!response.success) {
      toast.error("Failed to unfollow the user..!");
      return;
    }
    toast.success("Unfollow the @" + user.username);
  };
  return (
    // <div className="overlay">
    //   <div className="container-wrapper">
    //     <div className="container">
    //       <div className="profile">
    //         <img src={user.avtar} alt={user.username} />
    //         <span className="unfollow-msg">Unfollow @{user.username}</span>
    //       </div>
    //       <div className="options">
    //         <div className="option" onClick={unfollowHandler}>
    //           <span className="warn">Unfollow</span>
    //         </div>
    //         <div className="option" onClick={() => closeHander()}>
    //           <span>Cancel</span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="overlay">
      <div className="container-wrapper">
        <div className="container">
          {/* <div className="profile">
            <img src={user.avatar} alt={user.username} />
            <span className="unfollow-msg">Unfollow @{user.username}?</span>
          </div> */}
          <div className="profile">
            <img src={user.avtar} alt={user.username} />
            <span className="unfollow-msg">
              Unfollow <strong>@{user.username}</strong>
            </span>
          </div>
          <div className="options">
            <div className="option" onClick={unfollowHandler}>
              <span className="warn">Unfollow</span>
            </div>
            <div className="option" onClick={() => closeHander()}>
              <span>Cancel</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnFollow;
