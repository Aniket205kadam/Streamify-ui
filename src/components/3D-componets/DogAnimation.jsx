import React from "react";
import "./DogAnimation.scss";

function DogAnimation() {
  return (
<div class="main">
  <div class="dog">
    <div class="dog__paws">
      <div class="dog__bl-leg leg">
        <div class="dog__bl-paw paw"></div>
        <div class="dog__bl-top top"></div>
      </div>
      <div class="dog__fl-leg leg">
        <div class="dog__fl-paw paw"></div>
        <div class="dog__fl-top top"></div>
      </div>
      <div class="dog__fr-leg leg">
        <div class="dog__fr-paw paw"></div>
        <div class="dog__fr-top top"></div>
      </div>
    </div>

    <div class="dog__body">
      <div class="dog__tail"></div>
    </div>

    <div class="dog__head">
      <div class="dog__snout">
        <div class="dog__eyes">
          <div class="dog__eye-l"></div>
          <div class="dog__eye-r"></div>
        </div>
      </div>
    </div>

    <div class="dog__head-c">
      <div class="dog__ear-r"></div>
      <div class="dog__ear-l"></div>
    </div>
  </div>
</div>

  );
}

export default DogAnimation;
