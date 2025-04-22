import React, { useEffect, useState } from "react";
import "./Notifications.scss";
import userService from "../../services/userService";
import useConnectedUser from "../../hooks/useConnectedUser";
import { toast } from "react-toastify";
import { useConvertTime } from "../../hooks/useConvertTime";

function NotificationItem({ notification }) {
  const createdAt = useConvertTime(notification.createAt);

  if (notification.type === "LIKE") {
    return (
      <div className="notification" key={notification.id}>
        <div className="profile">
          <img
            src={notification.sender.avtar}
            alt={notification.sender.username + " profile"}
          />
        </div>
        <div className="meg">
          <span className="username">{notification.sender.username}</span>
          <span className="msg">liked your post.</span>
          <span className="created-at">{createdAt}</span>
        </div>
        <div className="post-image">
          <img src={notification.notificationImage} alt="post image" />
        </div>
      </div>
    );
  } else {
    const [loading, setLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const connectedUser = useConnectedUser();

    const isUserFollowing = async () => {
      const response = await userService.isFollowingUser(notification.sender.id, connectedUser.authToken);
      if (!response.success) {
        toast.error("Failed to load is user following or not..!");
        return;
      }
      setIsFollowing(response.data === 'true');
      setLoading(false);
    }

    useEffect(() => {
      isUserFollowing();
    }, []);

    if (loading) {
      return <h1>Loading...</h1>
    }

    return (
      <div className="notification" key={notification}>
        <div className="profile">
          <img
            src={notification.sender.avtar}
            alt={notification.sender.username + " profile"}
          />
        </div>
        <div className="meg">
          <span className="username">{notification.sender.username}</span>
          <span className="msg">started following you.</span>
          <span className="created-at">{notification.createdAt}</span>
        </div>
        <div className="btn">
          {isFollowing ? (
            <button className="following-btn">Following {isFollowing}</button>
          ) : (
            <button className="follow-btn">Follow {isFollowing}</button>
          )}
        </div>
      </div>
    );
  }
}

export default NotificationItem;
