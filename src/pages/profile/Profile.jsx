import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import "./Profile.scss";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faEllipsis,
  faXmark,
  faPhotoFilm,
  faChevronLeft,
  faChevronRight,
  faGear,
  faCamera,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import VerifiedBadge from "../../components/icons/VerifiedBadge";
import ReelIcon from "../../components/icons/ReelIcon";
import PostCard from "../../components/post/PostCard";
import FollowModal from "../../components/popups/FollowModal";
import useClickOutside from "../../hooks/useClickOutside";
import userService from "../../services/userService";
import useAuthToken from "../../hooks/useAuthToken";
import useConnectedUser from "../../hooks/useConnectedUser";
import storyService from "../../services/storyService";
import ShowInfoBanner from "../../components/popups/ShowInfoBanner";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [reels, setReels] = useState([]);
  const [postPage, setPostPage] = useState(0);
  const [reelPage, setReelPage] = useState(0);
  const [showPosts, setShowPosts] = useState(true);
  const [showReels, setShowReels] = useState(false);
  const [showSuggestedUser, setShowSuggestedUser] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const suggestedUsersRef = useRef();
  const followersBoxRef = useRef(null);
  const followingBoxRef = useRef(null);

  const connectedUser = useConnectedUser();
  const authToken = useAuthToken();
  const isOwnProfile = connectedUser.username === username;

  useClickOutside(followersBoxRef, () => setShowFollowers(false));
  useClickOutside(followingBoxRef, () => setShowFollowing(false));

  const fetchUserData = useCallback(async () => {
    setUser(null);
    setPosts([]);
    setReels([]);
    setLoading(true);
    setPostLoading(true);
    setError(null);

    try {
      const [userData, profileData, storyData] = await Promise.all([
        userService.getUserByUsername(username, authToken),
        userService.getUserProfileByUsername(username, authToken),
        storyService.isConnectedUserHasStory(authToken),
      ]);

      if (!userData.success || !profileData.success || !storyData.success) {
        setError("Failed to fetch user data");
        return;
      }

      setUser({
        ...userData.data,
        profilePictureUrl: URL.createObjectURL(profileData.data),
        story: storyData.data,
      });

      const postsResponse = isOwnProfile
        ? await userService.getMyPosts(authToken, postPage, 10)
        : await userService.getPostByUser(
            userData.data.id,
            postPage,
            10,
            authToken
          );

      if (postsResponse.success) {
        setPosts(postsResponse.data.content);
      } else {
        setError("Failed to fetch posts");
      }

      setLoading(false);
      setPostLoading(false);
    } catch (err) {
      setError("An error occurred while fetching data");
      setLoading(false);
    }
  }, [username, authToken, isOwnProfile, postPage]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleReels = useCallback(async () => {
    try {
      const reelsResponse = isOwnProfile
        ? await userService.getMyReels(authToken, reelPage, 10)
        : await userService.getReelsByUser(user.id, reelPage, 10, authToken);

      if (reelsResponse.success) {
        setReels(reelsResponse.data.content);
        setShowReels(true);
        setShowPosts(false);
      } else {
        setError("Failed to fetch reels");
      }
    } catch (err) {
      setError("An error occurred while fetching reels");
    }
  }, [isOwnProfile, authToken, reelPage, user?.id]);

  const scrollSuggestedUsers = useCallback((direction) => {
    if (suggestedUsersRef.current) {
      suggestedUsersRef.current.scrollBy({
        left: direction === "left" ? -700 : 700,
        behavior: "smooth",
      });
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className={`profile-container ${user.story ? "has-story" : ""}`}>
      <ProfileHeader
        user={user}
        isOwnProfile={isOwnProfile}
        onShowFollowers={() => setShowFollowers(true)}
        onShowFollowing={() => setShowFollowing(true)}
        onSuggestedUser={() => setShowSuggestedUser((prev) => !prev)}
      />

      {showSuggestedUser && (
        <SuggestedUsers
          users={user.similarUser}
          scrollLeft={() => scrollSuggestedUsers("left")}
          scrollRight={() => scrollSuggestedUsers("right")}
          ref={suggestedUsersRef}
        />
      )}

      <ContentTabs
        showPosts={showPosts}
        showReels={showReels}
        onShowPosts={() => {
          setShowPosts(true);
          setShowReels(false);
        }}
        onShowReels={handleReels}
      />

      {postLoading ? (
        <Loading />
      ) : (
        <ContentDisplay
          showPosts={showPosts}
          showReels={showReels}
          posts={posts}
          reels={reels}
        />
      )}

      {showFollowers && (
        <FollowModal
          ref={followersBoxRef}
          heading="Followers"
          users={followers}
          onClose={() => setShowFollowers(false)}
          onSearch={(query) =>
            setFollowers(
              followers.filter(
                (user) =>
                  user.username.includes(query) || user.fullName.includes(query)
              )
            )
          }
        />
      )}

      {showFollowing && (
        <FollowModal
          ref={followingBoxRef}
          heading="Following"
          users={following}
          onClose={() => setShowFollowing(false)}
          onSearch={(query) =>
            setFollowing(
              following.filter(
                (user) =>
                  user.username.includes(query) || user.fullName.includes(query)
              )
            )
          }
        />
      )}
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
};

const Loading = () => (
  <div className="loading">
    <svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>
  </div>
);

const ProfileHeader = memo(
  ({
    user,
    isOwnProfile,
    onShowFollowers,
    onShowFollowing,
    onSuggestedUser,
  }) => {
    const authToken = useAuthToken();
    const [followStatus, setFollowStatus] = useState({
      clickFollowBtn: false,
      status: null,
    });
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
      (async () => {
        const response = await userService.isFollowingUser(user.id, authToken);
        if (response.success) setIsFollowing(response.data === "true");
      })();
    }, [user, authToken]);

    const followHandler = async () => {
      const response = await userService.followUser(user.id, authToken);
      setFollowStatus({ clickFollowBtn: true, status: response.success });
    };

    return (
      <div className="profile-header">
        {followStatus.clickFollowBtn && (
          <ShowInfoBanner
            msg={
              followStatus.status
                ? `You're now following ${user.username}! 🎉`
                : `Oops! ❌ Failed to follow ${user.username}. Please try again!`
            }
            success={followStatus.status}
          />
        )}
        <div className="profile-picture">
          <div className="edit-profile-option">
            <FontAwesomeIcon icon={faCamera} />
          </div>
          <img src={user.profilePictureUrl} alt={`${user.username} profile`} />
        </div>
        <div className="profile-details">
          <div className="user-meta">
            <span className="username">{user.username}</span>
            <VerifiedBadge />
            <div className="action-buttons">
              {isOwnProfile ? (
                <>
                  <button className="btn">Edit profile</button>
                  <button className="btn">View archive</button>
                </>
              ) : (
                <>
                  {isFollowing ? (
                    <button className="btn message-btn">
                      Following
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                  ) : (
                    <button className="btn follow-btn" onClick={followHandler}>
                      Follow
                    </button>
                  )}
                  <button className="btn message-btn">Message</button>
                </>
              )}
            </div>
            {isOwnProfile ? (
              <div className="icon-buttons">
                <button className="btn">
                  <FontAwesomeIcon icon={faGear} />
                </button>
              </div>
            ) : (
              <div className="icon-buttons">
                <button
                  className="btn suggestions-btn"
                  onClick={onSuggestedUser}
                >
                  <FontAwesomeIcon icon={faUserPlus} />
                </button>
                <button className="btn more-options">
                  <FontAwesomeIcon icon={faEllipsis} />
                </button>
              </div>
            )}
          </div>

          <div className="profile-stats">
            <div className="stat">
              <span className="count">{user.postsCount}</span>
              <span>Posts</span>
            </div>
            <div
              className="stat"
              style={{ cursor: "pointer" }}
              onClick={onShowFollowers}
            >
              <span className="count">{user.followerCount}</span>
              <span>Followers</span>
            </div>
            <div
              className="stat"
              style={{ cursor: "pointer" }}
              onClick={onShowFollowing}
            >
              <span className="count">{user.followingCount}</span>
              <span>Following</span>
            </div>
          </div>

          <div className="bio-section">
            <span className="full-name">{user.fullName}</span>
            <p className="bio">{user.bio}</p>
          </div>
        </div>
      </div>
    );
  }
);

const SuggestedUsers = memo(({ users, scrollLeft, scrollRight, ref }) => (
  <div className="suggested-users">
    {users?.length > 6 && (
      <button className="scroll-btn left" onClick={scrollLeft}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
    )}
    <div className="header">
      <span>Suggested for you</span>
      <Link to="#" className="see-all">
        See all
      </Link>
    </div>
    <div className="users-list" ref={ref}>
      {users?.map((user) => (
        <div className="user-card" key={user.id}>
          <button className="remove-btn">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <img src={user.profileUrl} alt={`${user.username} profile`} />
          <span className="username">{user.username}</span>
          <VerifiedBadge />
          <span className="full-name">{user.fullName}</span>
          <Link to="#" className="follow-link">
            Follow
          </Link>
        </div>
      ))}
    </div>
    {users?.length > 6 && (
      <button className="scroll-btn right" onClick={scrollRight}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    )}
  </div>
));

const ContentTabs = memo(
  ({ showPosts, showReels, onShowPosts, onShowReels }) => (
    <div className="content-tabs">
      <div className={`tab ${showPosts ? "active" : ""}`} onClick={onShowPosts}>
        <FontAwesomeIcon icon={faPhotoFilm} />
        <span>Posts</span>
      </div>
      <div className={`tab ${showReels ? "active" : ""}`} onClick={onShowReels}>
        <ReelIcon />
        <span>Reels</span>
      </div>
    </div>
  )
);

const ContentDisplay = memo(({ showPosts, showReels, posts, reels }) => (
  <div className="content-display">
    {showPosts && (
      <div className="posts-list">
        {posts?.map((post) => (
          <Link to={`/post/${post.id}`}>
            <PostCard post={post} key={post.id} />
          </Link>
        ))}
      </div>
    )}
    {showReels && (
      <div className="reels-list">
        {reels?.map((reel) => (
          <PostCard post={reel} key={reel.id} />
        ))}
      </div>
    )}
  </div>
));

export default Profile;
