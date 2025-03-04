import React, { useEffect, useState } from "react";
import Like from "../icons/Like";
import userService from "../../services/userService";
import useAuthToken from "../../hooks/useAuthToken";
import { useConvertTime } from "../../hooks/useConvertTime";
import { toast } from "react-toastify";
import "./Comment.scss";
import commentService from "../../services/commentService";

function Comment({ comment }) {
  const [userProfile, setUserProfile] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likeCount || 0);
  const authToken = useAuthToken();

  const likeBtnHandler = async () => {
    const likeResponse = await commentService.likeComment(
      comment.id,
      authToken
    );
    if (!likeResponse.success) {
      toast.error(likeResponse.error);
      return;
    }
    setIsLiked((prev) => !prev);
    setLikeCount(likeResponse.data);
  };

  useEffect(() => {
    (async () => {
      const userResponse = await userService.getUserProfileByUsername(
        comment.user.username,
        authToken
      );
      if (!userResponse.success) {
        toast.error(userResponse.error);
        return;
      }
      setUserProfile(URL.createObjectURL(userResponse.data));

      // update createdAt
      setCreatedAt(useConvertTime(comment.createdAt));
    })();
    (async () => {
      const likeResponse = await commentService.isLikedComment(comment.id, authToken);
      if (!likeResponse.success) {
        toast.error(likeResponse.error);
        return;
      }
      setIsLiked(likeResponse.response);
    })();
  }, [comment]);

  console.log("comment: ", comment);

  return (
    <div className="comment" key={comment.id}>
      <div className="user-profile">
        <img src={userProfile} alt={comment.user.username} />
        <span>{comment.user.username}</span>
      </div>
      <div className="content">
        <p>{comment.content}</p>
      </div>
      <div className="meta">
        <div className="time">
          <span>{createdAt}</span>
        </div>
        <div className="likes">
          {likeCount > 0 && <span>{likeCount} like</span>}
        </div>
        <div className="like-button">
          <Like isLiked={isLiked} onClick={likeBtnHandler} />
        </div>
      </div>
    </div>
  );
}

export default Comment;
