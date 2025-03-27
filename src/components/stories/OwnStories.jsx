import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./OwnStories.scss";
import Story from "../story/Story";
import { useNavigate } from "react-router-dom";
import useConnectedUser from "../../hooks/useConnectedUser";
import storyService from "../../services/storyService";
import { toast } from "react-toastify";
import { useConvertTime } from "../../hooks/useConvertTime";

function OwnStories() {
  const connectedUser = useConnectedUser();
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [storyData, setStoryData] = useState({});
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [showViewers, setShowViewers] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await storyService.getStoriesByUser(
          connectedUser.username,
          connectedUser.authToken
        );
        if (response.success) {
          setStories(response.data);
          initializeStoryData(response.data);
        }
      } catch (error) {
        toast.error("Failed to load stories");
      } finally {
        setLoading(false);
      }
    };

    const initializeStoryData = async (stories) => {
      const data = {};
      for (const story of stories) {
        const [replies, likes, views] = await Promise.all([
          storyService.getStoryReplies(story.id, 0, 5, connectedUser.authToken),
          storyService.getStoryLikedUser(story.id, connectedUser.authToken),
          storyService.getStoryViewers(
            story.id,
            0,
            10,
            connectedUser.authToken
          ),
        ]);

        data[story.id] = {
          replies: replies.success ? replies.data.content : [],
          likes: likes.success ? likes.data : [],
          views: views.success ? views.data.content : [],
        };
      }
      setStoryData(data);
    };

    fetchStories();
  }, [connectedUser]);

  const handleClose = () => navigate("/");
  const handleNextStory = () =>
    setCurrentStoryIndex((prev) => Math.min(prev + 1, stories.length - 1));
  const handlePrevStory = () =>
    setCurrentStoryIndex((prev) => Math.max(prev - 1, 0));

  if (loading) return <div className="loading">Loading stories...</div>;
  if (!stories.length)
    return <div className="no-stories">No stories available</div>;

  const currentStory = stories[currentStoryIndex];
  const {
    replies = [],
    likes = [],
    views = [],
  } = storyData[currentStory?.id] || {};

  return (
    <div className="own-stories-container">
      <div className="story-viewer">
        <button className="close-btn" onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <div className="navigation">
          <button className="nav-btn prev" onClick={handlePrevStory} />
          <button className="nav-btn next" onClick={handleNextStory} />
        </div>

        <Story
          isStoryOwner={true}
          story={currentStory}
          username={connectedUser.username}
          key={currentStory.id}
        />

        <div className="story-meta">
          <div className="interactions">
            <div
              className="interaction-box viewers"
              onClick={() => {
                setShowLikes(false);
                setShowReplies(false);
                setShowViewers(true);
              }}
            >
              <span>{views.length || 0} views</span>
              {showViewers && views.length > 0 && (
                <div className="users-list">
                  {views?.map((viewer) => (
                    <UserItem
                      key={viewer.id}
                      user={viewer.viewer}
                      timestamp={viewer.viewedAt}
                    />
                  ))}
                </div>
              )}
            </div>

            <div
              className="interaction-box likes"
              onClick={(e) => {
                e.stopPropagation();
                setShowReplies(false);
                setShowViewers(false);
                setShowLikes(true);
              }}
            >
              <span>{likes.length} likes</span>
              {showLikes && likes.length > 0 && (
                <div className="users-list">
                  {likes.map((like) => (
                    <UserItem
                      key={like.id}
                      user={like}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="interaction-box replies" onClick={(e) => {
              e.stopPropagation();
              setShowLikes(false);
              setShowViewers(false);
              setShowReplies(prev => !prev);
            }}>
              <span>{replies.length} replies</span>
              {showReplies && replies.length > 0 && (
                <div className="replies-list">
                  {replies.map((reply) => (
                    <div key={reply.id} className="reply">
                      <UserItem user={reply.user} />
                      <p>{reply.content}</p>
                      <span>{useConvertTime(reply.createdAt)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const UserItem = ({ user, timestamp }) => {
  console.log("Liked users: " + user);
  if (!user) return;
  return (
    <div className="user-item">
      <img src={user.avtar} />
      <div className="user-info">
        <span>{user.username}</span>
        {timestamp && <span>{useConvertTime(timestamp)}</span>}
      </div>
    </div>
  );
};

export default OwnStories;
