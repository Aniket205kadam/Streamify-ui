import React, { useEffect, useState } from "react";
import "./PostCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faImages,
  faHeart,
  faComment,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import postService from "../../services/postService";
import useAuthToken from "../../hooks/useAuthToken";
import ShowInfoBanner from "../popups/ShowInfoBanner";
import { useNavigate } from "react-router-dom";

function PostCard({ post }) {
  const authToken = useAuthToken();
  const [firstPostImage, setFirstPostImage] = useState();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await postService.getPostMediaImagePreview(post.id, authToken);
      if (!response.success) {
        setError(response.error);
        return;
      }
      setFirstPostImage(URL.createObjectURL(response.data));
    })()
  }, []);


  return (
    <div className="post-card" key={post.id} onClick={() => navigate(`/post/${post.id}`)}>
      {error && <ShowInfoBanner msg={`🪲 ${error}`} />}
      {post.postMedia[0].type.startsWith("image/") ? (
        <img
          src={firstPostImage}
          alt={post.postMedia[0].altText}
          className="post-card__media"
        />
      ) : (
        <img
          src={firstPostImage}
          alt={post.postMedia[0].altText}
          className="post-card__media"
        />
      )}
      <div className="post-card__type">
        {post.postMedia[0].type.startsWith("video") && (
          <FontAwesomeIcon icon={faVideo} />
        )}
        {post.postMedia[0].type.startsWith("image/") &&
          post.postMedia.length == 1 && <FontAwesomeIcon icon={faImage} />}
        {post.postMedia[0].type.startsWith("image/") &&
          post.postMedia.length > 1 && <FontAwesomeIcon icon={faImages} />}
      </div>
      <div className="post-card__overlay">
        <div className="post-card__info">
          {!post.hideLikesAndViewCounts && (
            <div className="post-card__likes">
              <FontAwesomeIcon icon={faHeart} />
              <span>{post.likeCount}</span>
            </div>
          )}
          {post.allowComments && (
            <div className="post-card__comments">
              <FontAwesomeIcon icon={faComment} />
              <span>{post.commentCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
