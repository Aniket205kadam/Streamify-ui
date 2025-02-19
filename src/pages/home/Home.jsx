import React from "react";
import "./Home.scss";
import Stories from "../../components/stories/Stories";
import Posts from "../../components/posts/Posts";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

function Home() {
  const { showAddStoryBox } = useOutletContext();
  return (
    <div className="home">
      <Stories showAddStoryBox={showAddStoryBox} />
      <Posts />
    </div>
  );
}

export default Home;
