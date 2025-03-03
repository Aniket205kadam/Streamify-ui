import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const HlsVideoPlayer = ({ videoUrl, isMuted, setIsMuted }) => {
  const videoRef = useRef(null);

  console.log("Video url: ", videoUrl);

  useEffect(() => {
    if (!videoUrl) return;

    const video = videoRef.current;
    let hls;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);

      // Handle HLS errors
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error("Network error encountered. Trying to recover...");
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error("Media error encountered. Trying to recover...");
              hls.recoverMediaError();
              break;
            default:
              console.error("Unrecoverable error. Destroying HLS instance...");
              hls.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // For Safari (which supports HLS natively)
      video.src = videoUrl;
    }

    // Cleanup function
    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [videoUrl]);

  return (
    <video
      ref={videoRef}
      muted={isMuted}
      onDoubleClick={(event) => {
        event.target.muted = !isMuted;
        setIsMuted((muted) => !muted);
      }}
      onClick={(event) => {
        if (event.target.paused) {
          event.target.play();
        } else {
          event.target.pause();
        }
      }}
      controls
      style={{ width: "100%", height: "auto" }}
    />
  );
};

export default HlsVideoPlayer;