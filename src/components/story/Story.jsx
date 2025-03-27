import React, { useEffect, useRef, useState } from "react";
import Like from "../icons/Like";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeHigh,
  faVolumeXmark,
  faPlay,
  faCirclePause,
  faEllipsis,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./Story.scss";
import { useConvertTime } from "../../hooks/useConvertTime";
import storyService from "../../services/storyService";
import useConnectedUser from "../../hooks/useConnectedUser";
import userService from "../../services/userService";
import { toast } from "react-toastify";
import StoryInfo from "../popups/StoryInfo";
import AboutAccount from "../popups/AboutAccount";

function Story({ isStoryOwner, username, isAudio, setIsAudio }) {
  const connectedUser = useConnectedUser();
  const [stories, setStories] = useState([]);
  const [storyIdx, setStoryIdx] = useState(0);
  const [isPause, setIsPause] = useState(false);
  const [currStoryTime, setCurrStoryTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [userProfileUrl, setUserProfileUrl] = useState("");
  const [storyContent, setStoryContent] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [replyMsg, setReplyMsg] = useState("");
  const currContentRef = useRef(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showAboutAccount, setShowAboutAccount] = useState(false);
  const [showSendInstruction, setShowSendInstruction] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const storiesResponse = await storyService.getStoriesByUser(
          username,
          connectedUser.authToken
        );
        if (!storiesResponse.success) {
          toast.error(storiesResponse.error);
          return;
        }
        setStories(storiesResponse.data);

        const userResponse = await userService.getUserProfileByUsername(
          username,
          connectedUser.authToken
        );
        if (!userResponse.success) {
          toast.error("Failed to load the user profile!");
          return;
        }
        setUserProfileUrl(URL.createObjectURL(userResponse.data));
      } catch (error) {
        toast.error("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    })();
  }, [username, connectedUser.authToken]);

  // Fetch story content
  useEffect(() => {
    if (stories.length > 0) {
      (async () => {
        const contentUrls = [];
        for (const story of stories) {
          try {
            const storyResponse = await storyService.getStoryContent(
              story.id,
              connectedUser.authToken
            );
            if (storyResponse.success) {
              contentUrls.push(URL.createObjectURL(storyResponse.data));
            } else {
              toast.error(storyResponse.error);
            }
          } catch (error) {
            toast.error("Failed to fetch story content.");
          }
        }
        console.log("content: ", contentUrls);
        setStoryContent(contentUrls);
      })();
    }
  }, [stories, connectedUser.authToken]);

  useEffect(() => {
    if (stories.length > 0) {
      (async () => {
        const likeResposne = await storyService.isLiked(
          stories[storyIdx].id,
          connectedUser.authToken
        );
        if (!likeResposne.success) {
          toast.error(likeResposne.error);
          return;
        }
        setIsLiked(likeResposne.data === "true");
      })();
    }
  }, [storyIdx]);

  // if user watch the story continusly 5s that means seen the story
  useEffect(() => {
    (async () => {
      if (stories.length > 0 && !loading) {
        const startedStory = storyIdx;
        const timer = setTimeout(() => {
          if (startedStory === storyIdx) {
            const watching = async (id) => {
              const storyResposne = await storyService.viewStory(
                id,
                connectedUser.authToken
              );
              if (!storyResposne.success) {
                toast.error(storyResposne.error);
                return;
              }
              toast.success(`Watch story of ${username} and id: ${id}`);
            };
            watching(stories[storyIdx].id);
          }
        }, 5000);

        return () => clearTimeout(timer);
      }
    })();
  }, [storyIdx, stories, loading]);

  // Update current story time
  useEffect(() => {
    if (stories.length > 0 && !loading) {
      const time = useConvertTime(stories[storyIdx].createdAt);
      setCurrStoryTime(time);
    }
  }, [storyIdx, stories, loading]);

  const handlePlayPause = () => {
    if (currContentRef.current) {
      if (currContentRef.current.paused) {
        currContentRef.current.play();
        setIsPause(false);
      } else {
        currContentRef.current.pause();
        setIsPause(true);
      }
    }
  };

  const scrollLeft = () => {
    setIsLiked(false);
    setStoryIdx((prevStoryIdx) => Math.max(prevStoryIdx - 1, 0));
  };

  const scrollRight = () => {
    setIsLiked(false);
    setStoryIdx((prevStoryIdx) =>
      Math.min(prevStoryIdx + 1, stories.length - 1)
    );
  };

  const likeBtnHandler = async () => {
    const likeResponse = await storyService.likeStory(
      stories[storyIdx].id,
      connectedUser.authToken
    );
    if (!likeResponse.success) {
      toast.error(likeResponse.error);
      return;
    }
    setIsLiked((prevLike) => !prevLike);
  };

  const sendReply = async () => {
    if (replyMsg === "") {
      toast.warn("Please enter a reply first!");
      return;
    }
    const replyResponse = await storyService.sendReply(
      stories[storyIdx].id,
      replyMsg,
      connectedUser.authToken
    );
    if (!replyResponse.success) {
      toast.error(replyResponse.error);
      return;
    }
    setReplyMsg("");
    toast.success("Reply sent successfully!");
  };

  if (loading) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }

  return (
    <div className="story-container">
      {showOptions && (
        <StoryInfo
          isStoryOwner={isStoryOwner}
          closeOptions={setShowOptions}
          showAboutAccount={setShowAboutAccount}
        />
      )}
      {showAboutAccount && (
        <AboutAccount
          username={username}
          profileUrl={userProfileUrl}
          close={setShowAboutAccount}
        />
      )}
      {showSendInstruction && (
        <div className="story-message">
          ⌨️ Press{" "}
          <span style={{ fontWeight: "bold", color: "#007bff" }}>Enter</span> to
          send your reply.
        </div>
      )}
      <div className="story-main">
        <div className="story-header">
          <div className="user-info">
            <img src={userProfileUrl} alt={`${username} profile`} />
            <span className="username">{username}</span>
            <span className="timestamp">{currStoryTime}</span>
          </div>
          <div className="actions">
            {stories[storyIdx].type.startsWith("VIDEO") && (
              <>
                <div className="audio" onClick={() => setIsAudio(!isAudio)}>
                  <FontAwesomeIcon
                    icon={isAudio ? faVolumeHigh : faVolumeXmark}
                  />
                </div>
                <div className="play-pause" onClick={handlePlayPause}>
                  <FontAwesomeIcon icon={isPause ? faCirclePause : faPlay} />
                </div>
              </>
            )}
            <div className="more" onClick={() => setShowOptions(true)}>
              <FontAwesomeIcon icon={faEllipsis} />
            </div>
          </div>
        </div>

        <div className="story-content">
          {stories.length > 0 && storyIdx !== 0 && (
            <div className="left" onClick={scrollLeft}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
          )}
          {stories[storyIdx].type.startsWith("IMAGE") ? (
            <img
              src={storyContent[storyIdx]}
              alt={username + " story"}
              key={storyIdx}
            />
          ) : (
            <video
              ref={currContentRef}
              src={storyContent[storyIdx]}
              autoPlay
              loop
              muted={!isAudio}
              key={stories[storyIdx].id}
              playsInline
              style={{ backgroundColor: "black" }}
            />
          )}
          {stories.length > 0 && storyIdx !== stories.length - 1 && (
            <div className="right" onClick={scrollRight}>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          )}
        </div>
        {!isStoryOwner && (
          <div className="story-footer">
            <input
              type="text"
              placeholder={`Reply to ${stories[storyIdx].user.username}`}
              value={replyMsg}
              onChange={(event) => setReplyMsg(event.target.value)}
              onFocus={() => setShowSendInstruction(true)}
              onBlur={() => setShowSendInstruction(false)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sendReply();
                }
              }}
            />
            <Like isLiked={isLiked} onClick={likeBtnHandler} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Story;
