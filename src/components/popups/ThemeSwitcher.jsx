import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import "./ThemeSwitcher.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { dark, light } from "../../store/themeSlice";

function ThemeSwitcher({ closeThemeSwitcherHandler, ref }) {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const [isDark, setIsDark] = useState(theme.toLowerCase() === "dark");

  const toggleTheme = (event) => {
    event.preventDefault();
    setIsDark(prev => !prev);
    dispatch(isDark ? light() : dark());
  };
  

  return (
    <div className="switcher" ref={ref}>
      <div className="heading">
        <button onClick={closeThemeSwitcherHandler}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <h3>Switch appearance</h3>
        {theme.toLowerCase() === "dark" ? (
          <FontAwesomeIcon icon={faMoon} />
        ) : (
          <FontAwesomeIcon icon={faSun} />
        )}
      </div>
      <hr />
      <div className="mode">
        <span>Dark mode</span>
        <label for="theme" class="theme">
          <span class="theme__toggle-wrap">
            <input
              id="theme"
              class="theme__toggle"
              type="checkbox"
              role="switch"
              name="theme"
              checked={isDark}
              onChange={toggleTheme}
            />
            <span class="theme__fill"></span>
            <span class="theme__icon">
              {[...Array(9)].map((_, i) => (
                <span key={i} className="theme__icon-part"></span>
              ))}
            </span>
          </span>
        </label>
      </div>
    </div>
  );
}

export default ThemeSwitcher;
