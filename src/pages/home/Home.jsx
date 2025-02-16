import React from "react";
import "./Home.scss";
import Stories from "../../components/stories/Stories";
import Posts from "../../components/posts/Posts";
import { useState } from "react";

function Home() {
  return (
    <div className="home">
      <Stories />
      <Posts />
    </div>
  );
}

export default Home;
