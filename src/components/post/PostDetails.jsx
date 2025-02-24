import {
  faChevronLeft,
  faChevronRight,
  faComment,
  faEllipsis,
  faPaperPlane,
  faCircle
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleEmpty} from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Like from "../icons/Like";
import Save from "../icons/Save";
import { Link } from "react-router-dom";
import "./PostDetails.scss";

function PostDetails() {
  const post = {
    user: {
      username: "john_doe",
      profileUrl: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    location: "New York, USA",
    postMedia: [
      { type: "image/jpeg", url: "https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { type: "video/mp4", url: "https://videos.pexels.com/video-files/5548030/5548030-sd_640_360_25fps.mp4" },
    ],
    caption: "This is a sample post caption.",
    modifiedAt: null,
    createdAt: "2023-10-01T12:00:00Z",
    likes: 123,
    comments: [
      {
        id: 1,
        user: {
          username: "jane_doe",
          profileUrl: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        content: "Great post!",
        createdAt: "2023-10-01T12:05:00Z",
        likes: 10,
      },
    ],
    commentCount: 1,
  };

  const connectedUser = {
    username: "john_doe",
  };

  const [contentIdx, setContentIdx] = useState(0);
  const [commentMsg, setCommentMsg] = useState('');

  return (
    <div className="post-details-container">
      <div className="left">
        {post.postMedia.length > 1 && (
          <div className="left-chevron" onClick={() => navigateContent("left")}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
        )}
        <div className="content">
          {post.postMedia[contentIdx].type.startsWith("image/") ? (
            <img
              src={post.postMedia[contentIdx].url}
              alt={post.user.username + " profile"}
            />
          ) : (
            <video src={post.postMedia[contentIdx].url} autoPlay />
          )}
        </div>
        {post.postMedia.length > 1 && (
          <div
            className="right-chevron"
            onClick={() => navigateContent("right")}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        )}
        {post.postMedia.length > 1 && (
          <div className="image-position">
            <GenerateDots length={post.postMedia.length} idx={contentIdx} />
          </div>
        )}
      </div>
      <div className="right">
        <div className="post-owner">
          <div className="user-profile">
            <img
              src={post.user.profileUrl}
              alt={post.user.username + " profile"}
            />
          </div>
          <div className="user-name">
            <div className="name">{post.user.username}</div>
            <div className="location">{post.location}</div>
          </div>
          <div className="more-options">
            <FontAwesomeIcon icon={faEllipsis} />
          </div>
        </div>
        <hr />
        <div className="post-info">
          <div className="caption">
            <p>{post.caption}</p>
          </div>
          <div className="time">
            {post.modifiedAt ? (
              <span>Edited - {post.modifiedAt}</span>
            ) : (
              <span>Created - {post.createdAt}</span>
            )}
          </div>
        </div>
        <div className="comment-section">
          {post.comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <div className="user-profile">
                <img
                  src={comment.user.profileUrl}
                  alt={comment.user.username}
                />
                <span>{comment.user.username}</span>
              </div>
              <div className="content">
                <p>{comment.content}</p>
              </div>
              <div className="time">
                <span>{comment.createdAt}</span>
              </div>
              <div className="likes">
                {comment.likes > 0 && <span>{comment.likes} like</span>}
              </div>
              <div className="like-button">
                <Like />
              </div>
            </div>
          ))}
        </div>
        {connectedUser.username === post.user.username && (
          <div className="owner-option">
            <hr />
            <button>View insights</button>
          </div>
        )}
        <div className="actions">
          <div className="icons">
            <Like />
          </div>
          <div className="icons">
            <FontAwesomeIcon icon={faComment} className="icon" />
          </div>
          <div className="icons">
            <FontAwesomeIcon icon={faPaperPlane} className="icon" />
          </div>
          <div className="save">
            <Save />
          </div>
        </div>
        <div className="info">
          <div className="likes">
            <span>{post.likes} likes</span>
          </div>
          <div className="createAt">
            <span>{post.createdAt}</span>
          </div>
        </div>
        <div className="enter-commment-section">
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
    </div>
  );
}

const GenerateDots = ({ length, idx }) => {
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
};

export default PostDetails;
