import React from "react";
import VideoDetail from "../../components/VideoDetail";
import VideoList from "../../components/VideoList";

const HomeComponent = ({ videos, selectedVideo, onVideoSelect }) => {
  return (
    <div className="ui container">
      <div className="ui grid">
        <div className="ui row">
          <div className="eleven wide column">
            <VideoDetail video={selectedVideo} />
          </div>
          <div className="five wide column">
            <VideoList onVideoSelect={onVideoSelect} videos={videos} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
