import React, { useEffect, useState } from "react";
import "./Notifications.scss";
import useConnectedUser from "../../hooks/useConnectedUser";
import userService from "../../services/userService";
import { toast } from "react-toastify";
import NotificationItem from "./Notification";

function Notifications() {
  const [newNotifications, setNewNotifications] = useState([]);
  const [oldNotifications, setOldNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const connectedUser = useConnectedUser();

  const fetchNotification = async () => {
    const notificationResponse = await userService.getNotification(
      connectedUser.authToken
    );
    if (!notificationResponse.success) {
      toast.error("Failed to load the Notifications!");
      return;
    }
    setNewNotifications(notificationResponse.data);
  };

  const fetchSeenNotification = async () => {
    const seenNotificationResponse = await userService.getSeenNotification(
      connectedUser.authToken
    );
    if (!seenNotificationResponse.success) {
      toast.error("Failed to load the notification");
      return;
    }
    setOldNotifications(seenNotificationResponse.data);
    setLoading(false);
  };

  const seenNotification = async () => {
    const notificationResponse = await userService.seenNotification(
      connectedUser.authToken
    );
    if (!notificationResponse.success) {
      toast.error("Failed to seen the notification");
      return;
    }
    toast.success("Successfully seen new notification");
  };

  useEffect(() => {
    fetchNotification();
    fetchSeenNotification();
    setTimeout(() => {seenNotification()}, 10000);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="notification-wrapper">
      <h1>Notifications</h1>
      <div className="notification-container">
        {newNotifications.length != 0 && <h3>New</h3>}
        {newNotifications.map((notification) => (
          <NotificationItem notification={notification} key={notification.id} />
        ))}
        {oldNotifications.length != 0 && <h3>Earlier</h3>}
        {oldNotifications.map((notification) => (
          <NotificationItem notification={notification} key={notification.id} />
        ))}
      </div>
      {newNotifications.length === 0 && oldNotifications.length === 0 && (
        <div className="no-notification">
          <img
            src="https://img.freepik.com/premium-vector/modern-design-concept-no-notification-found-design_637684-237.jpg"
            alt="no-notification"
          />
        </div>
      )}
    </div>
  );
}

export default Notifications;
