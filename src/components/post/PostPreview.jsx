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

function PostPreview({ post }) {
  const isFromFollowedUser = false;
  const [commentMsg, setCommentMsg] = useState("");
  const [commentCount, setCommentCount] = useState(post.commentCount);
  const mediaRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
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
  // const [stompClient, setStompClient] = useState(null);
  // const [isConnect, setIsConnect] = useState(false);
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
    // if (stompClient && stompClient.connected) {
    //   stompClient.publish({
    //     destination: `/app/${post.id}/like`,
    //   });
    // } else {
    //   setError(new Error("WebSocket connection is not active.").message);
    // }
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

  // const connect = () => {
  //   const sockjs = new SockJS("http://localhost:8080/api/v1/ws");
  //   const temp = over(sockjs);
  //   setStompClient(temp);

  //   const headers = {
  //     Authorization: `Bearer ${authToken}`,
  //     "X-XSRF-TOKEN": getCookie("XSRF-TOKEN")
  //   }

  //   temp.connect(headers, onConnect, onError);
  // }

  // const getCookies = (cookieName) => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${cookieName}=`)
  //   if (parts.length === 2) {
  //     return parts.pop().split(";").shift();
  //   }
  // }

  // const onError = (error) => {
  //   console.log("onError: ", error);
  // }

  // const onConnect = () => {
  //   setIsConnect(true);
  // }

  // useEffect(() => {
  //   if (post && stompClient) {
  //     stompClient.send
  //   }
  // }, [post])

  // useEffect(() => {
  //   if (isConnect && stompClient) {
  //     const subscription = stompClient.subscribe(`/topic/posts/likes/${post.id}`, );
  //   }
  // })

  // useEffect(() => {
  //   connect();
  // }, []);

  // const recivedLikes = (payload) => {
  //   console.log("Playload: ", payload.body);
  // }

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

  // useEffect(() => {
  //   console.log("try to connected")
  //   const client = new Client({
  //     brokerURL: "ws://localhost:8080/api/v1/ws",
  //     connectHeaders: {
  //       Authorization: `Bearer ${authToken}`,
  //     },
  //     reconnectDelay: 5000,
  //     onConnect: () => {
  //       console.log("Connected to WebSocket");
  //       client.subscribe(`/topic/posts/likes/${post.id}`, (message) => {
  //         const updatedLikeCount = JSON.parse(message.body);
  //         console.log("Updated likes:", updatedLikeCount);
  //         setLikeCount(updatedLikeCount);
  //       });
  //     },
  //     onStompError: (error) => {
  //       console.error("STOMP error:", error);
  //       setError(`STOMP error: ${error.message || "STOMP protocol error."}`);
  //     },
  //     onWebSocketError: (error) => {
  //       console.error("WebSocket error:", error);
  //       setError(`WebSocket error: ${error.message || "Unable to connect to WebSocket server."}`);
  //     },
  //     onDisconnect: () => {
  //       console.log("Disconnected from WebSocket");
  //     },
  //   });

  //   client.activate();
  //   setStompClient(client);

  //   return () => {
  //     if (client) {
  //       client.deactivate();
  //     }
  //   };
  // }, [authToken, post.id]);

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
        </div>
      </div>
    </div>
  );
}

export default PostPreview;
