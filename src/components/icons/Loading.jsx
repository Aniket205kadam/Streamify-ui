import React from "react";
import "./Loading.scss";

function Loading({ top = 0 }) {
  return (
    <section class="dots-container">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </section>
  );
}

export default Loading;
