import axios from "axios";

const KEY = "AIzaSyASWTZiDYxVzfnwtduwgx3pyZDaiK-Y8lc";

export const baseParams = {
  part: "snippet",
  maxResults: 5,
  key: KEY,
};

export const videoParams = {
  part: encodeURI("snippet,statistics,contentDetails"),
  key: KEY,
};

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

export const channelParams = {
  part: encodeURI(
    "snippet,statistics,contentDetails,contentOwnerDetails,brandingSettings"
  ),
  id: "UC5rNuC4voh9OB5DeNlcjZRg",
  key: KEY,
};
