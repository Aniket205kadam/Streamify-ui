import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faBookmark,
  faEllipsis,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faComment, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import "./Reel.scss";
import ReadMoreCaption from "../post/ReadMoreCaption";
import Like from "../icons/Like";
import Save from "../icons/Save";
import postService from "../../services/postService";
import useConnectedUser from "../../hooks/useConnectedUser";
import { toast } from "react-toastify";
import userService from "../../services/userService";
import PostInfo from "../popups/PostInfo";
import { useNavigate } from "react-router-dom";
import useFollow from "../../hooks/useFollow";

const Reel = ({ reel, handleNext, handlePrev }) => {
  const connectedUser = useConnectedUser();
  const [contentUrl, setContentUrl] = useState("");
  const [reelOwnerProfile, setReelOwnerProfile] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState();
  const [isFollowing, setIsFollowing] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const navigate = useNavigate();

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef(null);

  const playOrPauseVideo = () => {
    if (videoRef.current.paused) {
      setIsVideoPaused(false);
      videoRef.current.play();
    } else {
      setIsVideoPaused(true);
      videoRef.current.pause();
    }
  };

  const muteOrUnmuteVideo = (event) => {
    event.stopPropagation();
    if (videoRef.current.muted) {
      videoRef.current.muted = false;
    } else if (!videoRef.current.muted) {
      videoRef.current.muted = true;
    }
    setIsVideoMuted((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowDown") {
        handleNext();
      } else if (event.key === "ArrowUp") {
        handlePrev();
      } else if (
        event.key === " " ||
        event.key === "Spacebar" ||
        event.code === "Space"
      ) {
        console.log("Clicked spacebar");
        playOrPauseVideo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext, handlePrev]);

  useEffect(() => {
    // current user is our following
    (async () => {
      const userResponse = await userService.isFollowingUser(
        reel.user.id,
        connectedUser.authToken
      );
      if (!userResponse.success) {
        toast.error(userResponse.error);
        return;
      }
      setIsFollowing(userResponse.data);
    })();

    // current user like this reel before
    (async () => {
      const likeResposne = await postService.isLikedPost(
        reel.id,
        connectedUser.authToken
      );
      if (!likeResposne.success) {
        toast.error(likeResposne.error);
        return;
      }
      setIsLiked(likeResposne.data);
    })();

    // current user save this reel before
    (async () => {
      const saveRespose = await postService.isSavedPost(
        reel.id,
        connectedUser.authToken
      );
      if (!saveRespose.success) {
        toast.error(saveRespose.error);
        return;
      }
      setIsSaved(saveRespose.data);
    })();

    // load the reel
    (async () => {
      const reelResposne = await postService.getPostMedia(
        reel.postMedia[0].id,
        connectedUser.authToken
      );
      if (!reelResposne.success) {
        toast.error("Failed to play the reel : ", reelResposne.error);
        return;
      }
      setContentUrl(URL.createObjectURL(reelResposne.data));
      setLikeCount(reel.likeCount);
    })();

    // load the user profile
    (async () => {
      const userResponse = await userService.getUserProfileByUsername(
        reel.user.username,
        connectedUser.authToken
      );
      if (!userResponse.success) {
        toast.error("Failed to load user profile");
        return;
      }
      setReelOwnerProfile(URL.createObjectURL(userResponse.data));
    })();
  }, [reel]);

  const likeBtnHandler = async (event) => {
    event.stopPropagation();
    const likeResponse = await postService.likePost(
      reel.id,
      connectedUser.authToken
    );
    if (!likeResponse.success) {
      toast.error(likeResponse.error);
      return;
    }
    setIsLiked((prev) => !prev);
    setLikeCount(likeResponse.data);
  };

  const saveBtnHandler = async (event) => {
    event.stopPropagation();
    const saveResposne = await postService.savePost(
      reel.id,
      connectedUser.authToken
    );
    if (!saveResposne.success) {
      toast.error(saveResposne.error);
      return;
    }
    setIsSaved((prev) => !prev);
    setLikeCount(saveResposne.data);
  };

  const shareLinkHandler = () => {
    //TODO: after deployed it will be changed
    navigator.clipboard
      .writeText(`http://localhost:5173/post/${reel.id}`)
      .then(() => toast.success("Reel URL copied to clipboard successfully!"))
      .catch(() =>
        toast.error("Failed to copy Reel URL to clipboard. Please try again.")
      );
  };

  return (
    <div className="reel">
      {showMoreOptions && (
        <PostInfo
          isFavorites={false}
          isFollowingPost={isFollowing}
          closeOptions={setShowMoreOptions}
          postId={reel.id}
        />
      )}
      <div className="content" onClick={playOrPauseVideo}>
        {isVideoPaused && (
          <span>
            <FontAwesomeIcon icon={faPause} />
          </span>
        )}
        <div className="audio" onClick={muteOrUnmuteVideo}>
          {isVideoMuted ? (
            <FontAwesomeIcon icon={faVolumeXmark} />
          ) : (
            <FontAwesomeIcon icon={faVolumeHigh} />
          )}
        </div>

        <video
          key={reel.postMedia.id}
          src={contentUrl || ""}
          autoPlay
          onEnded={handleNext}
          muted={isVideoMuted}
          ref={videoRef}
        />
      </div>
      <div className="actions">
        <div className="item">
          <Like isLiked={isLiked} onClick={likeBtnHandler} />
          <span>{likeCount}</span>
        </div>
        <div className="item" onClick={() => navigate(`/post/${reel.id}`)}>
          <FontAwesomeIcon icon={faComment} />
          <span>{reel.commentCount}</span>
        </div>
        <div className="item">
          <FontAwesomeIcon icon={faPaperPlane} onClick={shareLinkHandler} />
        </div>
        <div className="item">
          <Save isSaved={isSaved} onClick={saveBtnHandler} />
        </div>
        <div className="item">
          <FontAwesomeIcon
            icon={faEllipsis}
            onClick={() => setShowMoreOptions(true)}
          />
        </div>
      </div>
      <div className="details">
        <div className="user-info">
          <div className="profile">
            <img
              src={reelOwnerProfile}
              alt={reel.user.username + " profile"}
              className="profile-pic"
            />
          </div>
          <div className="username">
            <span>{reel.user.username}</span>
            {isFollowing === "false" && (
              <button
                className="follow-btn"
                onClick={(event) => {
                  event.stopPropagation();
                  useFollow(
                    reel.user.username,
                    reel.user.id,
                    connectedUser.authToken
                  );
                  isFollowing(true);
                }}
              >
                Follow{" "}
              </button>
            )}
          </div>
        </div>
        <div className="caption">
          <ReadMoreCaption paragraph={reel.caption} />
        </div>
      </div>
    </div>
  );
};

export default Reel;

// Since reel changes frequently, useEffect re-runs, removing and re-adding the event
// listener repeatedly. This can cause the listener to be removed before it executes,
// breaking the key press detection. Instead, use useRef to store reel without triggering
// re-renders or depend on stable functions like handleNext and handlePrev.
