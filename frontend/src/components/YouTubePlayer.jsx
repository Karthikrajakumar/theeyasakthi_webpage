import React from "react";
import ReactPlayer from "react-player/youtube";

const YouTubePlayer = ({ url }) => {
  return (
    <div style={{ position: "relative", paddingTop: "56.25%" }}>
      <ReactPlayer
        url={url}
        controls
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
};

export default YouTubePlayer;
