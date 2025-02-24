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

// {
//   id: "104",
//   caption:
//     "Late-night coding session fueled by coffee and determination! ☕️💻",
//   user: {
//     id: "",
//     username: "code_master",
//     profileUrl:
//       "https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&w=600",
//   },
//   liked: true,
//   likesCount: 89,
//   commentsCount: 30,
//   createdAt: "2025-02-09T23:45:00Z",
//   location: "San Francisco, CA",
//   collaborators: [],
//   hideLikesAndViewCounts: false,
//   allowComments: true,
//   postMedia: [
//     {
//       id: "205",
//       postId: "104",
//       mediaUrl:
//         "https://videos.pexels.com/video-files/30627970/13111089_1440_2560_25fps.mp4",
//       thumbnailUrl:
//         "https://images.pexels.com/photos/30594080/pexels-photo-30594080/free-photo-of-playful-cat-relaxing-on-sunlit-rocks-outdoors.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//       type: "video",
//       altText:
//         "A laptop screen displaying lines of code with a cup of coffee nearby",
//     },
//   ],
// }

function PostCard({ post }) {
  const authToken = useAuthToken();
  const [firstPostImage, setFirstPostImage] = useState();
  const [error, setError] = useState(false);

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
    <div className="post-card" key={post.id}>
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
