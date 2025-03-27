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
import useConnectedUser from "../../hooks/useConnectedUser";
import { useForm } from "react-hook-form";

function generateDots(length, idx) {
  if (length === 1) return;
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

const Video = ({ src }) => {
  return (
    <video
      src={src}
      onClick={(event) => {
        event.stopPropagation();
        event.target.paused ? event.target.play() : event.target.pause();
      }}
    />
  );
};

function UploadPostDetails({ files, handlePostUpload }) {
  const connectedUser = useConnectedUser();
  const [captionCount, setCaptionCount] = useState(0);
  const [mediaIdx, setMediaIdx] = useState(0);
  const [isAdvancedSettingsOpen, setIsAdvancedSettingsOpen] = useState(true);
  const { register, handleSubmit, trigger } = useForm();

  return (
    <div className="post-container">
      <div className="heading">
        <button>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <p>New reel</p>
        <span>
          <button
            onClick={async () => {
              const isValid = await trigger();
              console.log("here");
              if (isValid) handleSubmit(handlePostUpload)();
            }}
          >
            Share
          </button>
        </span>
      </div>
      <div className="body">
        <div
          className="left"
          onClick={() => setMediaIdx((prevIdx) => prevIdx - 1)}
        >
          {files.length > 0 && mediaIdx > 0 && (
            <div
              className="chevron-left"
              onClick={(e) => {
                e.stopPropagation();
                setMediaIdx((prev) => prev - 1);
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
          )}
          {files[mediaIdx].type.startsWith("image/") ? (
            <div className="content">
              <img src={URL.createObjectURL(files[mediaIdx])} />
            </div>
          ) : (
            <div className="content">
              <Video src={URL.createObjectURL(files[mediaIdx])} />
            </div>
          )}
          {files.length > 0 && mediaIdx < files.length - 1 && (
            <div
              className="chevron-right"
              onClick={(e) => {
                e.stopPropagation();
                setMediaIdx((prev) => prev + 1);
              }}
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
              <input
                type="text"
                name="caption"
                {...register("caption", { required: true })}
                onChange={(event) => setCaptionCount(event.target.value.length)}
              />
              <FontAwesomeIcon icon={faFaceSmile} />
              <CaptionCount captionCount={captionCount} />
            </div>
            <div className="location">
              <input
                type="text"
                placeholder="Add location"
                name="location"
                {...register("location", { required: true })}
              />
              <FontAwesomeIcon icon={faEarthAsia} />
            </div>
            {/* todo: this commented feature relase later */}
            {/* <div className="collaborators">
              <input
                type="text"
                placeholder="Add collaborators"
                {...register("collaborators", { required: false })}
              />
              <FontAwesomeIcon icon={faUserPlus} />
            </div> */}
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
                      <input
                        type="checkbox"
                        id="like-view"
                        {...register("isHideLike", { required: false })}
                      />
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
                      <input
                        type="checkbox"
                        id="comment"
                        {...register("isHideComment", { required: false })}
                      />
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

const CaptionCount = ({ captionCount }) => {
  return <span>{captionCount}/2,200</span>;
};

export default UploadPostDetails;
