import { Outlet } from "react-router-dom";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import "./style.scss";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import "./App.scss";
import Search from "./pages/search/Search";
import useClickOutside from "./hooks/useClickOutside";
import MoreOptions from "./components/popups/MoreOptions";
import ThemeSwitcher from "./components/popups/ThemeSwitcher";
import AddPost from "./components/posts/AddPost";
import AddStory from "./components/story/AddStory";

function App() {
  const location = useLocation();
  const showRightBar = location.pathname === "/";
  const [showSearchBox, setShowSearchBox] = useState(false);
  const theme = useSelector((state) => state.theme.theme);
  const searchRef = useRef(null);
  const [showMoreOptions, setShowMoreOption] = useState(false);
  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showCreateStory, setShowCreateStory] = useState(false);
  const moreOptionsRef = useRef(null);
  const themeSwitcherRef = useRef(null);
  const addPostRef = useRef(null);
  const addStoryRef = useRef(null);

  useClickOutside(searchRef, () => setShowSearchBox(false));
  useClickOutside(moreOptionsRef, () => setShowMoreOption(false));
  useClickOutside(themeSwitcherRef, () => setShowThemeSwitcher(false));
  useClickOutside(addPostRef, () => setShowCreatePost(false));
  useClickOutside(addStoryRef, () => setShowCreateStory(false));

  const switcherHandler = () => {
    setShowMoreOption(false);
    setShowThemeSwitcher(true);
  };

  const closeThemeSwitcherHandler = () => {
    setShowThemeSwitcher(false);
    setShowMoreOption(true);
  };

  return (
    <div className={`theme-${theme}`}>
      <div className={"layout"}>
        <LeftBar
          searchHandler={setShowSearchBox}
          moreHandler={setShowMoreOption}
          isOpenSearchBox={showSearchBox}
          createPostHandler={setShowCreatePost}
          isOpenCreatePostBox={showCreatePost}
        />
        <div
          className={`content ${showSearchBox ? "blurred" : ""}`}
          style={{
            flex: showRightBar ? "5" : "8.6",
          }}
        >
          <Outlet
            context={{ showAddStoryBox: () => setShowCreateStory(true) }}
          />
        </div>
        {showRightBar && <RightBar isBlur={showSearchBox} />}
      </div>

      {showSearchBox && <Search ref={searchRef} setShowSearchBox={setShowSearchBox} />}
      {showMoreOptions && (
        <MoreOptions
          ref={moreOptionsRef}
          currTheme={theme}
          switcherHandler={switcherHandler}
        />
      )}
      {showThemeSwitcher && (
        <ThemeSwitcher
          ref={themeSwitcherRef}
          closeThemeSwitcherHandler={closeThemeSwitcherHandler}
        />
      )}
      {showCreatePost && <AddPost ref={addPostRef} />}
      {showCreateStory && <AddStory ref={addStoryRef} />}
    </div>
  );
}

export default App;
