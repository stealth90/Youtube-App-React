import axios from "axios";

const KEY = "AIzaSyASWTZiDYxVzfnwtduwgx3pyZDaiK-Y8lc";

export const baseParams = {
  part: "snippet",
  maxResults: 5,
  key: KEY,
};

export const videoParams = {
  part: encodeURI("snippet,statistics,id,contentDetails"),
  key: KEY,
};

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});
