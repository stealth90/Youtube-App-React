import React, { useEffect, useState } from "react";
import youtube, { videoParams } from "../apis/youtube";

const VideoDetail = ({ video }) => {
  const [videoDetail, setVideoDetail] = useState();
  useEffect(() => {
    if (video) {
      getInfoVideo(video.id.videoId);
    }
  }, [video]);

  const getInfoVideo = async (id) => {
    const response = await youtube.get("/videos", {
      params: {
        ...videoParams,
        id,
      },
    });
    setVideoDetail(response.data.items[0]);
    console.log("ressponse", response);
  };

  if (!videoDetail && !video) {
    return <div></div>;
  }
  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  return (
    <div>
      <div className="ui embed">
        <iframe title="video player" src={videoSrc} />
      </div>
      <div className="ui segment">
        <h3 className="ui header">{videoDetail.snippet.title}</h3>
        <p>{videoDetail.snippet.description}</p>
      </div>
    </div>
  );
};

export default VideoDetail;
