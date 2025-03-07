import {
  faCalendarDays,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import "./AboutAccount.scss";
import useClickOutside from "../../hooks/useClickOutside";
import userService from "../../services/userService";
import useConnectedUser from "../../hooks/useConnectedUser";
import { toast } from "react-toastify";

function AboutAccount({ username, profileUrl, close }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const aboutRef = useRef(null);
  useClickOutside(aboutRef, () => close(false));
  const connectedUser = useConnectedUser();

  useEffect(() => {
    (async () => {
      const aboutResposne = await userService.getInfoAboutAccount(
        username,
        connectedUser.authToken
      );
      if (!aboutResposne.success) {
        toast.error(aboutResposne.error);
        return;
      }
      setUser(aboutResposne.data);
      setLoading(false);
    })();
  }, [username, profileUrl]);

  if (loading) {
    return;
  }

  return (
    <div className="about-wrapper">
      <div className="about-this-account" ref={aboutRef}>
        <div className="heading">
          <h2>About this account</h2>
          <hr />
        </div>
        <div className="profile">
          <div className="avtar">
            <img src={profileUrl} alt={`${user.username} profile`} />
          </div>
          <div className="username">
            <span>{user.username}</span>
          </div>
        </div>
        <div className="app-info">
          <p>
            To help keep our community authentic, we’re showing information
            about accounts on Instagram.
          </p>
        </div>
        <div className="join-date">
          <div className="icon">
            <FontAwesomeIcon icon={faCalendarDays} />
          </div>
          <div className="info">
            <span className="heading-info">Date joined</span>
            <span>{user.joinedDate}</span>
          </div>
        </div>
        <div className="location">
          <div className="icon">
            <FontAwesomeIcon icon={faLocationDot} />
          </div>
          <div className="info">
            <span className="heading-info">Account based in</span>
            <span>{user.location}</span>
          </div>
        </div>
        <hr />
        <div className="close" onClick={() => close(false)}>
          <span>Close</span>
        </div>
      </div>
    </div>
  );
}

export default AboutAccount;
