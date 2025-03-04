import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  faChevronLeft,
  faChevronRight,
  faComment,
  faEllipsis,
  faPaperPlane,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleEmpty } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useConnectedUser from "../../hooks/useConnectedUser";
import postService from "../../services/postService";
import userService from "../../services/userService";
import commentService from "../../services/commentService";
import { useConvertTime } from "../../hooks/useConvertTime";
import Like from "../icons/Like";
import Save from "../icons/Save";
import ReadMoreCaption from "../post/ReadMoreCaption";
import Comment from "./Comment";
import "./PostDetails.scss";
import { useNavigate } from "react-router-dom";
import PostCard from "../post/PostCard";

function PostDetails() {
  const { postId } = useParams();
  const connectedUser = useConnectedUser();

  const [post, setPost] = useState(null);
  const [postComments, setPostComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [postOwnerProfile, setPostOwnerProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const [contentIdx, setContentIdx] = useState(0);
  const [commentMsg, setCommentMsg] = useState("");
  const [commentCount, setCommentCount] = useState(0);
  const [postsMedia, setPostsMedia] = useState([]);

  // Fetch post details, comments, and like status
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postResponse = await postService.getPostById(
          postId,
          connectedUser.authToken
        );
        if (!postResponse.success) throw new Error(postResponse.error);

        setPost(postResponse.data);
        setLikeCount(postResponse.data.likeCount);
        setCommentCount(postResponse.data.commentCount);

        const commentResponse = await commentService.getCommentsOnPost(
          postId,
          connectedUser.authToken
        );
        if (!commentResponse.success) throw new Error(commentResponse.error);

        setPostComments(commentResponse.response.content);

        const likeResponse = await postService.isLikedPost(
          postId,
          connectedUser.authToken
        );
        if (!likeResponse.success) throw new Error(likeResponse.error);

        setIsLiked(likeResponse.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postId, connectedUser.authToken]);

  // Fetch post owner profile and media
  useEffect(() => {
    if (!post) return;

    const fetchPostOwnerProfile = async () => {
      try {
        const userResponse = await userService.getUserProfileByUsername(
          post.user.username,
          connectedUser.authToken
        );
        if (!userResponse.success) throw new Error(userResponse.error);

        setPostOwnerProfile(URL.createObjectURL(userResponse.data));
      } catch (error) {
        toast.error(error.message);
      }
    };

    const fetchPostMedia = async () => {
      try {
        const mediaUrls = await Promise.all(
          post.postMedia.map(async (media) => {
            const response = await postService.getPostMedia(
              media.id,
              connectedUser.authToken
            );
            if (!response.success) throw new Error(response.error);
            return URL.createObjectURL(response.data);
          })
        );
        setPostsMedia(mediaUrls);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchPostOwnerProfile();
    fetchPostMedia();
  }, [post, connectedUser.authToken]);

  const navigateContent = (direction) => {
    setContentIdx((prevIdx) =>
      direction === "left"
        ? (prevIdx - 1 + post.postMedia.length) % post.postMedia.length
        : (prevIdx + 1) % post.postMedia.length
    );
  };

  const toggleLeft = () => {
    if (contentIdx != 0) {
      setContentIdx((prevIdx) => prevIdx - 1);
    }
  };

  const toggleRight = () => {
    if (contentIdx != post.postMedia.length - 1) {
      setContentIdx((prevIdx) => prevIdx + 1);
    }
  };

  const sendComment = async () => {
    try {
      const response = await commentService.sendComment(
        post.id,
        commentMsg,
        connectedUser.authToken
      );
      if (!response.success) throw new Error(response.error);

      toast.success("Successfully posted the comment!");
      setCommentCount((prev) => prev + 1);

      const recentComment = {
        id: response.data,
        content: commentMsg,
        createdAt: Date.now(),
        user: connectedUser,
        likes: 0,
        replies: 0,
      };
      setPostComments((prev) =>
        prev ? [...prev, recentComment] : [recentComment]
      );
      setCommentMsg("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const likeBtnHandler = async () => {
    try {
      const response = await postService.likePost(
        post.id,
        connectedUser.authToken
      );
      if (!response.success) throw new Error(response.error);

      setLikeCount(response.data);
      setIsLiked((prev) => !prev);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="post-page">
      <div className="post-details-container">
        <div className="left">
          {contentIdx != 0 && post.postMedia.length > 1 && (
            <div className="left-chevron" onClick={toggleLeft}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
          )}
          <div className="content">
            {post.postMedia[contentIdx].type.startsWith("image/") ? (
              <img src={postsMedia[contentIdx]} alt={post.user.username} />
            ) : (
              <video src={postsMedia[contentIdx]} autoPlay controls />
            )}
          </div>
          {contentIdx != (post.postMedia || []).length - 1 &&
            post.postMedia.length > 1 && (
              <div className="right-chevron" onClick={toggleRight}>
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
              <img src={postOwnerProfile} alt={post.user.username} />
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
              <ReadMoreCaption paragraph={post.caption} key={post.id} />
            </div>
            <div className="time">
              {post.modifiedAt ? (
                <span>Edited - {useConvertTime(post.modifiedAt)}</span>
              ) : (
                <span>Created - {useConvertTime(post.createdAt)}</span>
              )}
            </div>
          </div>
          <CommentSection postComments={postComments} />
          {connectedUser.username === post.user.username && (
            <div className="owner-option">
              <hr />
              <button>View insights</button>
            </div>
          )}
          <div className="actions">
            <div className="icons">
              <Like isLiked={isLiked} onClick={likeBtnHandler} />
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
              <span>{likeCount} likes</span>
            </div>
            <div className="createAt">
              <span>{useConvertTime(post.createdAt)}</span>
            </div>
          </div>
          <div className="enter-commment-section">
            <div className="comment-opt">
              <Link
                to={``}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span>View all {commentCount} comments</span>
              </Link>
            </div>
            <div className="add-comment">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentMsg}
                onChange={(e) => setCommentMsg(e.target.value)}
              />
              {commentMsg?.trim().length > 0 && (
                <button className="comment-btn" onClick={sendComment}>
                  Post
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="similar-posts">
        <SimilarPost post={post} />
      </div>
      <footer className="rightBar-footer">
        <p>
          <Link to="#" className="info">
            · About
          </Link>
          <Link to="#" className="info">
            · Help
          </Link>
          <Link to="#" className="info">
            · Press
          </Link>
          <Link to="#" className="info">
            · API
          </Link>
          <Link to="#" className="info">
            · Jobs
          </Link>
          <Link to="#" className="info">
            · Privacy
          </Link>
          <Link to="#" className="info">
            · Terms
          </Link>
          <Link to="#" className="info">
            · Locations
          </Link>
          <Link to="#" className="info">
            · Language
          </Link>
        </p>
        <p>© 2025 STREAMIFY FROM ANIKETKADAM.DEV</p>
      </footer>
    </div>
  );
}

const SimilarPost = ({ post }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const connectedUser = useConnectedUser();

  useEffect(() => {
    (async () => {
      const postResposne = await userService.getPostByUser(
        post.user.id,
        0,
        6,
        connectedUser.authToken
      );
      if (!postResposne.success) {
        toast.error(postResposne.error);
        return;
      }
      console.log("Similar: ", postResposne.data);
      setPosts(postResposne.data.content.filter(p => p.id != post.id));
      setLoading(false);
    })();
  }, [post]);

  return (
    <div className="similar-post">
      <hr />
      <div className="user-account-like">
        <span>
          More Posts from
          <strong onClick={() => navigate(`/profile/${post.user.username}`)}>
            {post.user.username}
          </strong>
        </span>
      </div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="content">
          {(posts || []).map((post) => (
            <div className="post-card">
              <PostCard post={post} key={post.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CommentSection = ({ postComments }) => {
  return (
    <div className="comment-section">
      {postComments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

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

export default PostDetails;
