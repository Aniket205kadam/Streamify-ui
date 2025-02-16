import React, { useRef, useState } from "react";
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

function PostPreview({ post }) {
  const isFromFollowedUser = false;
  const [commentMsg, setCommentMsg] = useState(null);
  const mediaRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

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

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <div className="profile-image">
              <img
                className="avatar user-avatar"
                src={post.user.profileUrl}
                alt={post.user.username + "profile"}
              />
              {post.collaborators.length > 0 && (
                <img
                  className="avatar collab-avatar"
                  src={
                    "https://images.pexels.com/photos/3779760/pexels-photo-3779760.jpeg?auto=compress&cs=tinysrgb&w=600"
                  }
                  alt={post.collaborators.username}
                />
              )}
            </div>
            <div className="details">
              <div className="username">
                <Link
                  to={`/${post.user.username}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <span className="name">{post.user.username}</span>
                </Link>
                {post.collaborators.length > 0 && (
                  <div>
                    <span>and</span>
                    <span className="name">
                      {" "}
                      {post.collaborators.length == 1
                        ? post.collaborators[0]
                        : post.collaborators.length + " " + " others" }{" "}
                    </span>
                  </div>
                )}
              </div>
              <span className="date">{post.createdAt}</span>
            </div>
            {!isFromFollowedUser && (
              <button
                className="follow-btn"
                onClick={() => {
                  console.log(post.user.username + " follow");
                }}
              >
                Follow
              </button>
            )}
          </div>
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
        <div className="content">
          {post.postMedia.length > 1 && (
            <button className="scroll-btn left" onClick={scrollLeft}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          )}

          <div className="media-container" ref={mediaRef}>
            {post.postMedia.map((postMedia) =>
              postMedia.type.startsWith("image") ? (
                <img
                  src={postMedia.mediaUrl}
                  alt={postMedia.altText}
                  key={postMedia.id}
                />
              ) : postMedia.type.startsWith("video") ? (
                  <video
                    key={postMedia.id}
                    muted={true}
                    onDoubleClick={(event) => {
                      if (isMuted) {
                        event.target.muted = false;
                      } else {
                        event.target.muted = true;
                      }
                      setIsMuted(muted => !muted);
                    }}
                    onClick={(event) => {
                      if (event.target.paused) {
                        event.target.play();
                      } else {
                        event.target.pause();
                      }
                    }}
                  >
                    <source src={postMedia.mediaUrl} type="video/mp4" />
                  </video>
              ) : null
            )}
          </div>

          {post.postMedia.length > 1 && (
            <button className="scroll-btn right" onClick={scrollRight}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          )}
        </div>
        <div className="info">
          <div className="item">
            <div class="heart-container" title="Like">
              <input type="checkbox" class="checkbox" id="Give-It-An-Id" />
              <div class="svg-container">
                <svg
                  viewBox="0 0 24 24"
                  class="svg-outline"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  class="svg-filled"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                </svg>
                <svg
                  class="svg-celebrate"
                  width="100"
                  height="100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon points="10,10 20,20"></polygon>
                  <polygon points="10,50 20,50"></polygon>
                  <polygon points="20,80 30,70"></polygon>
                  <polygon points="90,10 80,20"></polygon>
                  <polygon points="90,50 80,50"></polygon>
                  <polygon points="80,80 70,70"></polygon>
                </svg>
              </div>
            </div>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faComment} className="icon" />
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faPaperPlane} className="icon" />
          </div>
          <div className="save">
            <label class="ui-bookmark">
              <input type="checkbox" />
              <div class="bookmark">
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
          <span>{post.likes} likes</span>
        </div>
        <div className="caption">
          {/* <strong>{post.user.username}</strong>{" "} */}
          <ReadMoreCaption paragraph={post.caption} />
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
