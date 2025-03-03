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
} from "@fortawesome/free-solid-svg-icons";
import ReadMoreCaption from "./ReadMoreCaption";
import userService from "../../services/userService";
import Like from "../icons/Like";
import useAuthToken from "../../hooks/useAuthToken";
import { useConvertTime } from "../../hooks/useConvertTime";
import useIsFollowing from "../../hooks/useIsFollowing";
import PostInfo from "../popups/PostInfo";
import postService from "../../services/postService";
import Hls from "hls.js";
import HlsVideoPlayer from "./HlsVideoPlayer";
import ShowInfoBanner from "../popups/ShowInfoBanner";

function PostPreview({ post }) {
  const isFromFollowedUser = false;
  const [commentMsg, setCommentMsg] = useState("");
  const mediaRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [error, setError] = useState(false);
  const [userProfile, setUserProfile] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [isFollowingUserPost, setIsFollowingUserPost] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [postsMedia, setpostsMedia] = useState([]);
  const [isLikedPost, setIsLikedPost] = useState(false);
  const [toggleLikeBtn, setToggleLikeBtn] = useState(0);
  const authToken = useAuthToken();

  const scrollLeft = () => {
    mediaRef.current.scrollBy({
      left: -mediaRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    mediaRef.current.scrollBy({
      left: mediaRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  const postComment = () => {
    console.log("Post: " + commentMsg);
  };

  const likeBtnHandler = async () => {
    const response = await postService.likePost(post.id, authToken);
    if (!response.success) {
      setError(response.error);
      return;
    }
    setToggleLikeBtn((prev) => prev + 1);
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
      post.postMedia.forEach(async (postMedia) => {
        const response = await postService.getPostMedia(
          postMedia.id,
          authToken
        );
        if (!response.success) {
          setError(response.error);
          return;
        }
        setpostsMedia((prevMedia) => {
          if (prevMedia)
            setpostsMedia([
              ...prevMedia,
              { id: postMedia.id, url: URL.createObjectURL(response.data) },
            ]);
          else
            setpostsMedia([
              { id: postMedia.id, url: URL.createObjectURL(response.data) },
            ]);
        });
      });
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
          {(post.postMedia || []).length > 1 && (
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
                // <video
                //   key={postMedia.id}
                //   muted={true}
                //   onDoubleClick={(event) => {
                //     if (isMuted) {
                //       event.target.muted = false;
                //     } else {
                //       event.target.muted = true;
                //     }
                //     setIsMuted((muted) => !muted);
                //   }}
                //   onClick={(event) => {
                //     if (event.target.paused) {
                //       event.target.play();
                //     } else {
                //       event.target.pause();
                //     }
                //   }}
                // >
                //   <source src={postMedia.mediaUrl} type="video/mp4" />
                // </video>
                <HlsVideoPlayer
                  isMuted={isMuted}
                  setIsMuted={setIsMuted}
                  videoUrl={
                    (postsMedia || []).find(
                      (media) => media.id === postMedia.id
                    )?.url
                  }
                />
              ) : null
            )}
          </div>

          {(post.postMedia || []).length > 1 && (
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
            <label className="ui-bookmark">
              <input type="checkbox" />
              <div className="bookmark">
                <svg viewBox="0 0 32 32">
                  <g>
                    <path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z"></path>
                  </g>
                </svg>
              </div>
            </label>
          </div>
        </div>
        <div className="likes">
          <span>{post.likeCount} likes</span>
        </div>
        <div className="caption">
          <ReadMoreCaption paragraph={post.caption || ""} />
        </div>
        <div className="comment-opt">
          <Link to={``} style={{ textDecoration: "none", color: "inherit" }}>
            <span>View all {post.commentCount} comments</span>
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
        </div>
      </div>
    </div>
  );
}

export default PostPreview;
