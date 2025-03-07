import React, { useEffect, useRef, useState } from "react";
import "./PostPreview.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faComment,
  faPaperPlane,
  faChevronLeft,
  faChevronRight,
  faVolumeHigh,
  faVolumeXmark,
  faCirclePlay,
  faCirclePause,
  faCircle,
  faFaceSmile,
  faPlayCircle,
  faPauseCircle,
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleEmpty } from "@fortawesome/free-regular-svg-icons";
import ReadMoreCaption from "./ReadMoreCaption";
import userService from "../../services/userService";
import Like from "../icons/Like";
import Save from "../icons/Save";
import useAuthToken from "../../hooks/useAuthToken";
import { useConvertTime } from "../../hooks/useConvertTime";
import useIsFollowing from "../../hooks/useIsFollowing";
import PostInfo from "../popups/PostInfo";
import postService from "../../services/postService";
import HlsVideoPlayer from "./HlsVideoPlayer";
import ShowInfoBanner from "../popups/ShowInfoBanner";
import commentService from "../../services/commentService";
import { toast } from "react-toastify";
import EmojiPicker from "emoji-picker-react";
import useClickOutside from "../../hooks/useClickOutside";

function PostPreview({ post }) {
  const isFromFollowedUser = false;
  const [commentMsg, setCommentMsg] = useState("");
  const [commentCount, setCommentCount] = useState(post.commentCount);
  const mediaRef = useRef(null);
  const emojiRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState(false);
  const [userProfile, setUserProfile] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [isFollowingUserPost, setIsFollowingUserPost] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [postsMedia, setpostsMedia] = useState([]);
  const [isLikedPost, setIsLikedPost] = useState(false);
  const [isSavedPost, setIsSavedPost] = useState(false);
  const [toggleLikeBtn, setToggleLikeBtn] = useState(0);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState(false);
  const authToken = useAuthToken();
  const videoRef = useRef(null);
  const [contentIdx, setContentIdx] = useState(0);

  useClickOutside(mediaRef, () => setIsOpenEmojiPicker(false));

  const scrollLeft = () => {
    if (contentIdx != 0) {
      setContentIdx((prevIdx) => prevIdx - 1);
    }
    mediaRef.current.scrollBy({
      left: -mediaRef.current.clientWidth,
      behavior: "smooth",
    });
    if (currentIdx != post.postMedia.length - 1) {
      setCurrentIdx((prevIdx) => prevIdx + 1);
    }
  };

  const scrollRight = () => {
    if (contentIdx < (post.postMedia.length - 1)) {
      setContentIdx((prevIdx) => prevIdx + 1);
    }
    mediaRef.current.scrollBy({
      left: mediaRef.current.clientWidth,
      behavior: "smooth",
    });
    if (currentIdx != 0) {
      setCurrentIdx((prevIdx) => prevIdx - 1);
    }
  };

  const postComment = async () => {
    const response = await commentService.sendComment(
      post.id,
      commentMsg,
      authToken
    );
    if (!response.success) {
      toast.error(response.error);
      setError(response.error);
      return;
    }
    toast.success("Succfully post the comment!");
    setCommentMsg("");
    setCommentCount((prevCommentCount) => prevCommentCount + 1);
  };

  const likeBtnHandler = async () => {
    const response = await postService.likePost(post.id, authToken);
    if (!response.success) {
      setError(response.error);
      return;
    }
    setLikeCount(response.data);
    setIsLikedPost((prev) => !prev);
    setToggleLikeBtn((prev) => prev + 1);
  };

  const clickSavedHandler = async () => {
    const resposne = await postService.savePost(post.id, authToken);
    if (!resposne.success) {
      setError(resposne.error);
      return;
    }
    console.log("resposne save: ", resposne);
    setIsSavedPost((prev) => !prev);
  };

  const loadPostContent = async () => {
    const mediaPromises = post.postMedia.map(async (postMedia) => {
      const response = await postService.getPostMedia(postMedia.id, authToken);
      if (!response.success) {
        setError(response.error);
        return null;
      }
      return { id: postMedia.id, url: URL.createObjectURL(response.data) };
    });

    // Wait for all media URLs to be resolved
    const mediaResults = await Promise.all(mediaPromises);

    // Filter out any null values (failed requests)
    const validMedia = mediaResults.filter((media) => media !== null);

    // Update the state once with all valid media
    setpostsMedia(validMedia);
  };

  useEffect(() => {
    (async () => {
      const response = await userService.getUserProfileByUsername(
        post.user.username,
        authToken
      );
      if (!response.success) {
        setError(response.error);
        return;
      }
      setUserProfile(URL.createObjectURL(response.data));
      setCreatedAt(useConvertTime(post.createdAt));

      // check the give post is following user post
      const status = await useIsFollowing(post.user.id, authToken);
      setIsFollowingUserPost(status.data === "true" ? true : false);

      // load the post images or videos
      await loadPostContent();
      // check current post is saved
      const savedRespose = await postService.isSavedPost(post.id, authToken);
      if (!savedRespose.success) {
        setError(savedRespose.error);
        return;
      }
      setIsSavedPost(savedRespose.data);
    })();
  }, [post.user.username, authToken]);

  useEffect(() => {
    (async () => {
      // check the current user like this post or not
      const likeResponse = await postService.isLikedPost(post.id, authToken);
      setIsLikedPost(likeResponse.data);
    })();
  }, [toggleLikeBtn]);

  return (
    <div className="post" key={post.id}>
      {error && <ShowInfoBanner msg={error} />}
      {toggleLikeBtn != 0 && isLikedPost && (
        <ShowInfoBanner
          msg={"You have successfully liked this post."}
          success
        />
      )}
      {showMoreActions && (
        <PostInfo
          isFavorites={false}
          isFollowingPost={isFollowingUserPost}
          closeOptions={setShowMoreActions}
          postId={post.id}
        />
      )}
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <div className="profile-image">
              <img
                className="avatar user-avatar"
                src={userProfile}
                alt={post.user.username + " profile"}
              />
            </div>
            <div className="details">
              <div className="username">
                <Link
                  to={`/${post.user.username}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <span className="name">{post.user.username}</span>
                </Link>
                {(post.collaborators || []).length > 0 && (
                  <div>
                    <span>and</span>
                    <span className="name">
                      {" "}
                      {post.collaborators.length === 1
                        ? post.collaborators[0]
                        : post.collaborators.length + " others"}{" "}
                    </span>
                  </div>
                )}
              </div>
              <span className="date">{createdAt}</span>
            </div>
            {!isFromFollowedUser && (
              <button
                className="follow-btn"
                style={
                  isFollowingUserPost
                    ? {
                        backgroundColor: "inherit",
                        color: "#0a87f5",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }
                    : undefined
                }
                onClick={() => {
                  if (isFollowingUserPost) {
                    console.log(post.user.username + " unFollow");
                  } else {
                    console.log(post.user.username + " follow");
                  }
                }}
              >
                {isFollowingUserPost ? (
                  <span>Following</span>
                ) : (
                  <span>Follow</span>
                )}
              </button>
            )}
          </div>
          <FontAwesomeIcon
            icon={faEllipsis}
            onClick={() => setShowMoreActions(true)}
          />
        </div>
        <div className="content">
          {(post.postMedia || []).length > 1 && contentIdx !== 0 && (
            <button className="scroll-btn left" onClick={scrollLeft}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          )}

          <div className="media-container" ref={mediaRef}>
            {(post.postMedia || []).map((postMedia) =>
              postMedia.type.startsWith("image") ? (
                <img
                  src={
                    (postsMedia || []).find(
                      (media) => media.id === postMedia.id
                    )?.url
                  }
                />
              ) : postMedia.type.startsWith("video") ? (
                <div className="video">
                  <video
                    ref={videoRef}
                    muted={isMuted}
                    src={
                      (postsMedia || []).find(
                        (media) => media.id === postMedia.id
                      )?.url
                    }
                    onClick={(event) => {
                      const video = event.target;
                      if (video.paused) {
                        setIsPaused(false);
                        video.play();
                      } else {
                        setIsPaused(true);
                        video.pause();
                      }
                    }}
                  />
                  <div className="video-controls">
                    <button
                      className="control-icon"
                      onClick={() => setIsMuted((prev) => !prev)}
                    >
                      {isMuted ? (
                        <FontAwesomeIcon icon={faVolumeMute} />
                      ) : (
                        <FontAwesomeIcon icon={faVolumeUp} />
                      )}
                    </button>
                    <button className="control-icon">
                      {isPaused ? (
                        <FontAwesomeIcon icon={faPlayCircle} />
                      ) : (
                        <FontAwesomeIcon icon={faPauseCircle} />
                      )}
                    </button>
                  </div>
                </div>
              ) : null
            )}
          </div>
          <GenerateDots length={post.postMedia.length} idx={contentIdx} />
          {(post.postMedia || []).length > 1 && contentIdx !== (post.postMedia.length - 1) && (
            <button className="scroll-btn right" onClick={scrollRight}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          )}
        </div>
        <div className="info">
          <div className="item">
            <div
              className="like"
              onClick={() => console.log("Like btn is clicked!")}
            >
              <Like isLiked={isLikedPost} onClick={likeBtnHandler} />
            </div>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faComment} className="icon" />
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faPaperPlane} className="icon" />
          </div>
          <div className="save">
            <Save isSaved={isSavedPost} onClick={clickSavedHandler} />
          </div>
        </div>
        <div className="likes">
          <span>{likeCount} likes</span>
        </div>
        <div className="caption">
          <ReadMoreCaption paragraph={post.caption || ""} />
        </div>
        <div className="comment-opt">
          <Link to={``} style={{ textDecoration: "none", color: "inherit" }}>
            <span>View all {commentCount} comments</span>
          </Link>
        </div>
        <div className="add-comment">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentMsg}
            onChange={(event) => setCommentMsg(event.target.value)}
          />
          {commentMsg?.trim().length > 0 && (
            <button className="comment-btn" onClick={postComment}>
              Post
            </button>
          )}
          <FontAwesomeIcon
            icon={faFaceSmile}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpenEmojiPicker(!isOpenEmojiPicker);
            }}
          />
          <div
            className={`emoji-picker ${isOpenEmojiPicker ? "open" : ""}`}
            ref={emojiRef}
          >
            <EmojiPicker
              onEmojiClick={(emojiData) => {
                setCommentMsg((prev) => prev + emojiData.emoji);
              }}
              previewConfig={{ showPreview: false }}
              skinTonesDisabled
              theme="light"
              searchDisabled
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const GenerateDots = ({ length, idx }) => {
  if (length === 1) return null;
  return (
    <div className="post-state">
      {Array.from({ length }, (_, index) => (
        <div key={index} className="point">
          {index === idx ? (
            <FontAwesomeIcon icon={faCircle} />
          ) : (
            <FontAwesomeIcon icon={faCircleEmpty} />
          )}
        </div>
      ))}
    </div>
  );
};

export default PostPreview;
