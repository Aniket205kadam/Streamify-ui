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
        const [replies, likes] = await Promise.all([
          storyService.getStoryReplies(story.id, 0, 5, connectedUser.authToken),
          storyService.getStoryLikedUser(story.id, connectedUser.authToken),
        ]);

        data[story.id] = {
          replies: replies.success ? replies.data.content : [],
          likes: likes.success ? likes.data : [],
        };
      }
      setStoryData(data);
      console.log("here: ",data);
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
  const { replies = [], likes = [] } = storyData[currentStory?.id] || {};

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
              onClick={() => setShowViewers(!showViewers)}
            >
              <span>{currentStory.viewers?.length || 0} views</span>
              {showViewers && (
                <div className="users-list">
                  {currentStory.viewers?.map((viewer) => (
                    <UserItem
                      key={viewer.id}
                      user={viewer.user}
                      timestamp={viewer.createdAt}
                    />
                  ))}
                </div>
              )}
            </div>

            <div
              className="interaction-box likes"
              onClick={() => setShowLikes(!showLikes)}
            >
              <span>{likes.length} likes</span>
              {showLikes && (
                <div className="users-list">
                  {likes.map((like) => (
                    <UserItem
                      key={like.id}
                      user={like.user}
                      timestamp={like.createdAt}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="interaction-box replies">
              <span>{replies.length} replies</span>
              <div className="replies-list">
                {replies.map((reply) => (
                  <div key={reply.id} className="reply">
                    <UserItem user={reply.user} />
                    <p>{reply.content}</p>
                    <span>{useConvertTime(reply.createdAt)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const UserItem = ({ user, timestamp }) => (
  <div className="user-item">
    <img src={user.profileUrl} alt={user.username} />
    <div className="user-info">
      <span>{user.username}</span>
      {timestamp && <span>{useConvertTime(timestamp)}</span>}
    </div>
  </div>
);

export default OwnStories;
