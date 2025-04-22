import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import "./Profile.scss";
import { data, Link, useNavigate, useParams } from "react-router-dom";
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
  faLink,
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
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../store/authenticationSlice";
import UnFollow from "../../components/popups/UnFollow";

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

  const loadFollowings = async () => {
    const response = await userService.getFollowings(username, connectedUser.authToken);
    if (!response.success) {
      toast.error("Failed to load the followings");
      return;
    }
    setFollowing(response.data);
  }

  const loadFollowers = async () => {
    const response = await userService.getFollowers(username, connectedUser.authToken);
    if (!response.success) {
      toast.error("Failed to load the followers");
      return;
    }
    setFollowers(response.data);
  }

  useEffect(() => {
    console.log("Here")
    loadFollowings();
    loadFollowers();
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
          follows={followers}
          user={user}
          onClose={() => setShowFollowers(false)}
          isCurrentUserProfile={user.username === connectedUser.username}
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
          user={user}
          follows={following}
          onClose={() => setShowFollowing(false)}
          isCurrentUserProfile={user.username === connectedUser.username}
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
    const connectedUser = useConnectedUser();
    const authToken = useAuthToken();
    const [followStatus, setFollowStatus] = useState({
      clickFollowBtn: false,
      status: null,
    });
    const dispatch = useDispatch();
    const [isFollowing, setIsFollowing] = useState(false);
    const [avtar, setAvtar] = useState(null);
    const navigate = useNavigate();
    const [isUnfollowBoxOpen, setIsUnfollowBoxOpen] = useState(false);
    const { getRootProps, getInputProps } = useDropzone({
      accept: {
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
      },

      onDrop: (files) => {
        uploadProfile(files[0]);
      },
    });

    useEffect(() => {
      (async () => {
        const response = await userService.isFollowingUser(user.id, authToken);
        if (response.success) setIsFollowing(response.data === "true");
      })();
    }, [user, authToken]);

    const uploadProfile = async (file) => {
      const avtarResponse = await userService.uploadUserProfile(
        file,
        authToken
      );
      if (!avtarResponse.success) {
        toast.error(avtarResponse.error);
        return;
      }
      toast.success("Successfully upload the profile!");
      setAvtar(avtarResponse.data);
      dispatch(login({ ...connectedUser, profileUrl: avtarResponse.data }));
    };

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
        {isUnfollowBoxOpen && <UnFollow user={user} avtar={avtar} closeHander={() => setIsUnfollowBoxOpen(false)} />}
        <div className="profile-picture">
          {isOwnProfile && (
            <div className="edit-profile-option" {...getRootProps()}>
              <input {...getInputProps()} />
              <FontAwesomeIcon icon={faCamera} />
            </div>
          )}
          {isOwnProfile ? (
            <img
              src={connectedUser.profileUrl}
              alt={`${user.username} profile`}
            />
          ) : (
            <img
              src={user.profilePictureUrl}
              alt={`${user.username} profile`}
            />
          )}
        </div>
        <div className="profile-details">
          <div className="user-meta">
            <span className="username">{user.username}</span>
            <VerifiedBadge />
            <div className="action-buttons">
              {isOwnProfile ? (
                <>
                  <button
                    className="btn"
                    onClick={() => navigate("/accounts/edit/")}
                  >
                    Edit profile
                  </button>
                  <button className="btn">View archive</button>
                </>
              ) : (
                <>
                  {isFollowing ? (
                    <button className="btn message-btn" onClick={() => setIsUnfollowBoxOpen(true)}>
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
            {user.website && (
              <p className="website">
                <a href={user.website} target="_blank">
                  <FontAwesomeIcon icon={faLink} />
                  {user.website}
                </a>
              </p>
            )}
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
          <img
            src={avtar || user.profileUrl}
            alt={`${user.username} profile`}
          />
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
          <Link to={`/post/${post.id}`} key={post.id}>
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
