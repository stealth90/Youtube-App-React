import './VideoItem.css';
import React from 'react';

const VideoItem = ({ video, onVideoSelect }) =>{
    return (
        <div className="video-item item" onClick={()=> {onVideoSelect(video)}}>
            <img className="ui image" src={video.snippet.thumbnails.medium.url} alt={video.snippet.title}/>
            <div className="content">
                <h4 className="header">{video.snippet.title}</h4>
            </div>
        </div>
    );
}

export default VideoItem ;