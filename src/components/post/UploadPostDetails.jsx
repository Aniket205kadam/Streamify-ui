import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChevronRight,
  faChevronLeft,
  faCircle,
  faFaceSmile,
  faEarthAsia,
  faUserPlus,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleEmpty } from "@fortawesome/free-regular-svg-icons";
import "./UploadPostDetails.scss";

function generateDots(length, idx) {
  return (
    <div className="post-state">
      {Array.from({ length }, (_, index) => (
        <div className="point">
          {index === idx ? (
            <FontAwesomeIcon icon={faCircle} />
          ) : (
            <FontAwesomeIcon icon={faCircleEmpty} />
          )}
        </div>
      ))}
    </div>
  );
}

function UploadPostDetails({ files, handlePostUpload }) {
  const connectedUser = {
    username: "aniket205kadam",
    profileUrl:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600",
  };
  const captionCount = 20;
  const [mediaIdx, setMediaIdx] = useState(0);
  const [isAdvancedSettingsOpen, setIsAdvancedSettingsOpen] = useState(false);

  return (
    <div className="post-container">
      <div className="heading">
        <button>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <p>New reel</p>
        <span onClick={handlePostUpload}>Share</span>
      </div>
      <div className="body">
        <div
          className="left"
          onClick={() => setMediaIdx((prevIdx) => prevIdx - 1)}
        >
          {files.length > 0 && mediaIdx > 0 && (
            <div className="chevron-left">
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
          )}
          {files[mediaIdx].type.startsWith("image/") ? (
            <div className="content">
              <img src={URL.createObjectURL(files[mediaIdx])} />
            </div>
          ) : (
            <div className="content">
              <video
                src={URL.createObjectURL(files[mediaIdx])}
                onClick={(event) => {
                  event.target.paused
                    ? event.target.play()
                    : event.target.pause();
                }}
              />
            </div>
          )}
          {files.length > 0 && files.length != mediaIdx && (
            <div
              className="chevron-right"
              onClick={() => setMediaIdx((prevIdx) => prevIdx + 1)}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          )}
          <div className="image-position">
            {generateDots(files.length, mediaIdx)}
          </div>
        </div>
        <div className="right">
          <div className="current-user">
            <img
              src={connectedUser.profileUrl}
              alt={connectedUser.username + " profile"}
            />
            <span>{connectedUser.username}</span>
          </div>
          <form>
            <div className="caption">
              <input type="text" name="caption" />
              <FontAwesomeIcon icon={faFaceSmile} />
              <span>{captionCount}/2,200</span>
            </div>
            <div className="location">
              <input type="text" placeholder="Add location" name="location" />
              <FontAwesomeIcon icon={faEarthAsia} />
            </div>
            <div className="collaborators">
              <input type="text" placeholder="Add collaborators" />
              <FontAwesomeIcon icon={faUserPlus} />
            </div>
            {/* <div className="advanced-settings" onClick={() => setIsAdvancedSettingsOpen(prev => !prev)}>
              <div className="heading">
                <span>Advanced settings</span>
                {isAdvancedSettingsOpen ? (
                  <div>
                    <FontAwesomeIcon icon={faChevronUp} />
                    <div className="body">
                      <lable htmlFor="like-view">
                        Hide like and view counts on this post
                      </lable>
                      <input type="checkbox" id="like-view" />
                      <p>
                        Only you will see the total number of likes and views on
                        this post. You can change this later by going to the ...
                        menu at the top pf the post.
                      </p>
                      <label htmlFor="comment">Turn off commenting</label>
                      <input type="checkbox" id="comment" />
                      <p>
                        You can change this later by going to the ... menu at
                        the top of your post.
                      </p>
                      <hr />
                      <p>
                        Your reel will be shared with your followers in their
                        feeds and can be seen on your profile.
                      </p>
                    </div>
                  </div>
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
                )}
              </div>
            </div> */}
            <div className="advanced-settings">
              <div className="heading">
                <span>Advanced settings</span>
                <div
                  className="toggle"
                  onClick={() => setIsAdvancedSettingsOpen((prev) => !prev)}
                >
                  {isAdvancedSettingsOpen ? (
                    <FontAwesomeIcon icon={faChevronUp} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronDown} />
                  )}
                </div>
              </div>

              {isAdvancedSettingsOpen && (
                <div className="body">
                  <div className="setting-item">
                    <label htmlFor="like-view">
                      Hide like and view counts on this post
                    </label>
                    <label class="switch">
                      <input type="checkbox" id="like-view" />
                      <span class="slider"></span>
                    </label>
                    <p>
                      Only you will see the total number of likes and views on
                      this post. You can change this later by going to the ...
                      menu at the top of the post. To hide like counts on other
                      people's posts, go to your account settings.
                    </p>
                  </div>
                  <br />
                  <div className="setting-item">
                    <label htmlFor="comment">Turn off commenting</label>
                    <label class="switch">
                      <input type="checkbox" id="comment" />
                      <span class="slider"></span>
                    </label>
                    <p>
                      You can change this later by going to the ... menu at the
                      top of your post.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadPostDetails;
