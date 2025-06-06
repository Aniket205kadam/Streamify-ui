import React, { useEffect, useRef, useState } from "react";
import "./LeftBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faCompass,
  faMessage,
  faHeart,
  faSquarePlus,
  faBars,
  faGear,
  faBookmark,
  faMoon,
  faSun,
  faChartLine,
  faBug,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { dark, light } from "../../store/themeSlice";
import { useNavigate, useLocation } from "react-router-dom";
import useConnectedUser from "../../hooks/useConnectedUser";
import { toast } from "react-toastify";
import userService from "../../services/userService";
import logo from "../../assets/logo-transparent.png";

function LeftBar({
  searchHandler,
  isOpenSearchBox,
  moreHandler,
  createPostHandler,
  isOpenCreatePostBox,
  isNotificationOpen,
  notificationHandler,
}) {
  const connectedUser = useConnectedUser();
  // const theme = useSelector((state) => state.theme.theme);
  // const [showPopup, setShowPopup] = useState(false);
  const popup = useRef();
  // const [isDark, setIsDark] = useState(theme === "dark" ? true : false);
  // const [showDarkMode, setShowDarkMode] = useState();
  // const dispatch = useDispatch();
  const [isNotification, setIsNotification] = useState(false);
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const [isLeftBarHalf, setIsLeftBarHalf] = useState(false);

  const isNotificationPresent = async () => {
    const response = await userService.isUnseenNotificationPresent(
      connectedUser.authToken
    );
    if (!response.success) {
      toast.error("Failed to find unseen notifications..!");
      return;
    }
    console.log("Log here: " + response.data);
    setIsNotification(response.data === "true");
  };

  useEffect(() => {
    isNotificationPresent();
  }, []);

  useEffect(() => {
    setIsLeftBarHalf(
      isNotificationOpen ||
        isOpenSearchBox ||
        currentLocation.pathname === "/direct/inbox/"
    );
  }, [isNotificationOpen, isOpenSearchBox, currentLocation]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popup.current && !popup.current.contains(event.target)) {
        setShowDarkMode(false);
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isLeftBarHalf) {
    return (
      <div className="leftBar" style={{ flex: 0.6 }}>
        <div className="container">
          <div className="app-heading" onClick={() => navigate("/")}>
            <img src={logo} alt="streamify-logo" />
          </div>
          <div className="menu">
            <div className="item" onClick={() => navigate("/")}>
              {currentLocation.pathname === "/" &&
              !isOpenSearchBox &&
              !isOpenCreatePostBox ? (
                <>
                  <FontAwesomeIcon icon={faHouse} size="2xl" fade />
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faHouse} size="2xl" />
                </>
              )}
            </div>

            <div className="item" onClick={() => searchHandler(true)}>
              {isOpenSearchBox ? (
                <>
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" fade />
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" />
                </>
              )}
            </div>

            <div className="item" onClick={() => navigate("/explore")}>
              {currentLocation.pathname === "/explore" && !isOpenSearchBox ? (
                <>
                  <FontAwesomeIcon icon={faCompass} size="2xl" fade />
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faCompass} size="2xl" />
                </>
              )}
            </div>

            <div className="item" onClick={() => navigate("/reels")}>
              {currentLocation.pathname === "/reels" && !isOpenSearchBox ? (
                <>
                  <FontAwesomeIcon icon={faYoutube} size="2xl" fade />
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faYoutube} size="2xl" />
                </>
              )}
            </div>

            <div className="item" onClick={() => navigate("/direct/inbox/")}>
              {currentLocation.pathname === "/direct/inbox/" ? (
                <>
                  <FontAwesomeIcon icon={faMessage} size="2xl" fade />
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faMessage} size="2xl" />
                </>
              )}
            </div>

            <div className="item" onClick={() => notificationHandler(true)}>
              {isNotification && (
                <div className="red-bot">{isNotification}</div>
              )}
              {isNotificationOpen ? (
                <>
                  <FontAwesomeIcon icon={faHeart} size="2xl" fade />
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faHeart} size="2xl" />
                </>
              )}
            </div>

            <div className="item" onClick={() => createPostHandler(true)}>
              {isOpenCreatePostBox ? (
                <>
                  <FontAwesomeIcon icon={faSquarePlus} size="2xl" fade />
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faSquarePlus} size="2xl" />
                </>
              )}
            </div>

            <div
              className="user"
              onClick={() => navigate(`/profile/${connectedUser.username}`)}
            >
              {currentLocation.pathname ===
              `/profile/${connectedUser.username}` ? (
                <>
                  <img
                    src={connectedUser.profileUrl}
                    alt={connectedUser.username + " profile"}
                  />
                </>
              ) : (
                <>
                  <img
                    src={connectedUser.profileUrl}
                    alt={connectedUser.username + " profile"}
                  />
                </>
              )}
            </div>
          </div>
          <hr />
          <div className="second-menu" onClick={() => moreHandler(true)}>
            <div className="item" onClick={() => setShowPopup(true)}>
              <FontAwesomeIcon icon={faBars} />
            </div>
          </div>
          {/* {showPopup && (
          <div className="popup-overplay" ref={popup}>
            <div className="popup">
              <ul>
                <li>
                  <div>
                    <FontAwesomeIcon icon={faGear} />
                    <span>Setting</span>
                  </div>
                </li>
                <li>
                  <div>
                    <FontAwesomeIcon icon={faChartLine} />
                    <span>Your activity</span>
                  </div>
                </li>
                <li>
                  <div
                    style={{
                      paddingBottom: "0",
                    }}
                  >
                    <FontAwesomeIcon icon={faBookmark} />
                    <span>Saved</span>
                  </div>
                </li>
                <li
                  onClick={() => setShowDarkMode(true)}
                  style={{
                    cursor: "pointer",
                    padding: "10px",
                    paddingTop: "0",
                    margin: "0",
                    boxSizing: "border-box",
                    listStyle: "none",
                    display: "block",
                  }}
                >
                  <div>
                    <span>
                      <div>
                        {isDark ? (
                          <FontAwesomeIcon icon={faMoon} />
                        ) : (
                          <FontAwesomeIcon icon={faSun} />
                        )}
                        <span>Switch appearance</span>
                      </div>
                    </span>
                  </div>

                  {showDarkMode && (
                    <div
                      style={{
                        display: "block",
                        marginTop: "10px",
                        paddingLeft: "25px",
                      }}
                    >
                      <span
                        style={{ display: "inline-grid", marginBottom: "5px" }}
                      >
                        Dark mode
                      </span>
                      <div
                        onClick={toggleDarkMode}
                        style={{
                          width: "50px",
                          height: "25px",
                          background: isDark ? "#d6d4ce" : "#fcd158",
                          borderRadius: "25px",
                          position: "relative",
                          cursor: "pointer",
                          transition: "0.3s",
                        }}
                      >
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            background: "white",
                            borderRadius: "50%",
                            position: "absolute",
                            top: "50%",
                            left: isDark ? "calc(100% - 22px)" : "3px",
                            transform: "translateY(-50%)",
                            transition: "0.3s",
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </li>

                <li>
                  <div>
                    <FontAwesomeIcon icon={faBug} />
                    <span>Report a problem</span>
                  </div>
                </li>
                <li>
                  <div className="logout">
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <span>Logout</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )} */}
        </div>
      </div>
    );
  } else {
    return (
      <div className="leftBar" style={{ flex: 2 }}>
        <div className="container">
          <div className="app-heading">
            <h1 className="streamify-logo" style={{ fontSize: "40px" }}>
              Stremify
            </h1>
          </div>
          <div className="menu">
            <div className="item" onClick={() => navigate("/")}>
              {currentLocation.pathname === "/" &&
              !isOpenSearchBox &&
              !isOpenCreatePostBox ? (
                <>
                  <FontAwesomeIcon icon={faHouse} size="2xl" fade />
                  <span style={{ fontWeight: "bold" }}>Home</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faHouse} size="2xl" />
                  <span>Home</span>
                </>
              )}
            </div>

            <div className="item" onClick={() => searchHandler(true)}>
              {isOpenSearchBox ? (
                <>
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" fade />
                  <span style={{ fontWeight: "bold" }}>Search</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" />
                  <span>Search</span>
                </>
              )}
            </div>

            <div className="item" onClick={() => navigate("/explore")}>
              {currentLocation.pathname === "/explore" && !isOpenSearchBox ? (
                <>
                  <FontAwesomeIcon icon={faCompass} size="2xl" fade />
                  <span style={{ fontWeight: "bold" }}>Explore</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faCompass} size="2xl" />
                  <span>Explore</span>
                </>
              )}
            </div>

            <div className="item" onClick={() => navigate("/reels")}>
              {currentLocation.pathname === "/reels" && !isOpenSearchBox ? (
                <>
                  <FontAwesomeIcon icon={faYoutube} size="2xl" fade />
                  <span style={{ fontWeight: "bold" }}>Reels</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faYoutube} size="2xl" />
                  <span>Reels</span>
                </>
              )}
            </div>

            <div className="item" onClick={() => navigate("/direct/inbox/")}>
              {currentLocation.pathname === "/direct/inbox/" ? (
                <>
                  <FontAwesomeIcon icon={faMessage} size="2xl" fade />
                  <span style={{ fontWeight: "bold" }}>Messages</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faMessage} size="2xl" />
                  <span>Messages</span>
                </>
              )}
            </div>

            <div className="item" onClick={() => notificationHandler(true)}>
              {isNotification && (
                <div className="red-bot">{isNotification}</div>
              )}
              {isNotificationOpen ? (
                <>
                  <FontAwesomeIcon icon={faHeart} size="2xl" fade />
                  <span style={{ fontWeight: "bold" }}>Notifications</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faHeart} size="2xl" />
                  <span>Notifications</span>
                </>
              )}
            </div>

            <div className="item" onClick={() => createPostHandler(true)}>
              {isOpenCreatePostBox ? (
                <>
                  <FontAwesomeIcon icon={faSquarePlus} size="2xl" fade />
                  <span style={{ fontWeight: "bold" }}>Create</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faSquarePlus} size="2xl" />
                  <span>Create</span>
                </>
              )}
            </div>

            <div
              className="user"
              onClick={() => navigate(`/profile/${connectedUser.username}`)}
            >
              {currentLocation.pathname ===
              `/profile/${connectedUser.username}` ? (
                <>
                  <img
                    src={connectedUser.profileUrl}
                    alt={connectedUser.username + " profile"}
                  />
                  <span style={{ fontWeight: "bold" }}>Profile</span>
                </>
              ) : (
                <>
                  <img
                    src={connectedUser.profileUrl}
                    alt={connectedUser.username + " profile"}
                  />
                  <span>Profile</span>
                </>
              )}
            </div>
          </div>
          <hr />
          <div className="second-menu" onClick={() => moreHandler(true)}>
            <div className="item" onClick={() => setShowPopup(true)}>
              <FontAwesomeIcon icon={faBars} />
              <span>More</span>
            </div>
          </div>
          {/* {showPopup && (
          <div className="popup-overplay" ref={popup}>
            <div className="popup">
              <ul>
                <li>
                  <div>
                    <FontAwesomeIcon icon={faGear} />
                    <span>Setting</span>
                  </div>
                </li>
                <li>
                  <div>
                    <FontAwesomeIcon icon={faChartLine} />
                    <span>Your activity</span>
                  </div>
                </li>
                <li>
                  <div
                    style={{
                      paddingBottom: "0",
                    }}
                  >
                    <FontAwesomeIcon icon={faBookmark} />
                    <span>Saved</span>
                  </div>
                </li>
                <li
                  onClick={() => setShowDarkMode(true)}
                  style={{
                    cursor: "pointer",
                    padding: "10px",
                    paddingTop: "0",
                    margin: "0",
                    boxSizing: "border-box",
                    listStyle: "none",
                    display: "block",
                  }}
                >
                  <div>
                    <span>
                      <div>
                        {isDark ? (
                          <FontAwesomeIcon icon={faMoon} />
                        ) : (
                          <FontAwesomeIcon icon={faSun} />
                        )}
                        <span>Switch appearance</span>
                      </div>
                    </span>
                  </div>

                  {showDarkMode && (
                    <div
                      style={{
                        display: "block",
                        marginTop: "10px",
                        paddingLeft: "25px",
                      }}
                    >
                      <span
                        style={{ display: "inline-grid", marginBottom: "5px" }}
                      >
                        Dark mode
                      </span>
                      <div
                        onClick={toggleDarkMode}
                        style={{
                          width: "50px",
                          height: "25px",
                          background: isDark ? "#d6d4ce" : "#fcd158",
                          borderRadius: "25px",
                          position: "relative",
                          cursor: "pointer",
                          transition: "0.3s",
                        }}
                      >
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            background: "white",
                            borderRadius: "50%",
                            position: "absolute",
                            top: "50%",
                            left: isDark ? "calc(100% - 22px)" : "3px",
                            transform: "translateY(-50%)",
                            transition: "0.3s",
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </li>

                <li>
                  <div>
                    <FontAwesomeIcon icon={faBug} />
                    <span>Report a problem</span>
                  </div>
                </li>
                <li>
                  <div className="logout">
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <span>Logout</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )} */}
        </div>
      </div>
    );
  }
}

export default LeftBar;
