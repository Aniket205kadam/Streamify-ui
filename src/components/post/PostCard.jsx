import React from "react";
import "./PostCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faImages,
  faHeart,
  faComment,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

function PostCard({ post }) {
  return (
    <div className="post-card" key={post.id}>
      {post.postMedia[0].type.startsWith("image") ? (
        <img
          src={post.postMedia[0].mediaUrl}
          alt={post.postMedia[0].altText}
          className="post-card__media"
        />
      ) : (
        <img
          src={post.postMedia[0].thumbnailUrl}
          alt={post.postMedia[0].altText}
          className="post-card__media"
        />
      )}
      <div className="post-card__type">
        {post.postMedia[0].type.startsWith("video") && (
          <FontAwesomeIcon icon={faVideo} />
        )}
        {post.postMedia[0].type.startsWith("image") &&
          post.postMedia.length == 1 && <FontAwesomeIcon icon={faImage} />}
        {post.postMedia[0].type.startsWith("image") &&
          post.postMedia.length > 1 && <FontAwesomeIcon icon={faImages} />}
      </div>
      <div className="post-card__overlay">
        <div className="post-card__info">
          {!post.hideLikesAndViewCounts && (
            <div className="post-card__likes">
              <FontAwesomeIcon icon={faHeart} />
              <span>{post.likesCount}</span>
            </div>
          )}
          {post.allowComments && (
            <div className="post-card__comments">
              <FontAwesomeIcon icon={faComment} />
              <span>{post.commentsCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
