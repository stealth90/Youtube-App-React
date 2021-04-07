import React, { useState, useEffect } from "react";
import { Grid, Segment, Sidebar, Menu, Icon } from "semantic-ui-react";
import youtube, { baseParams } from "../apis/youtube";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import Header from "./Header";
import "./App.css";

const App = (props) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState();
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    onTermSubmit("buildings");
  }, []);

  const onTermSubmit = async (term) => {
    let response;
    try {
      response = await youtube.get("/search", {
        params: {
          ...baseParams,
          q: term,
        },
      });
    } catch (err) {
      console.log("err", err);
    }
    if (response) {
      console.log("response", response.data);
      setVideos(response.data.items);
      setSelectedVideo(response.data.items[0]);
    }
  };

  const onVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <Grid columns={1}>
      <Grid.Column>
        <Header onOpenSidebar={handleOpenSidebar} onFormSubmit={onTermSubmit} />
      </Grid.Column>
      <Grid.Column>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            onHide={() => setOpenSidebar(false)}
            vertical
            visible={openSidebar}
            width="thin"
          >
            <Menu.Item as="a">
              <div className="navLink">
                <Icon className="iconLink" size="large" name="home" />
                <label className="">Home</label>
              </div>
            </Menu.Item>
            <Menu.Item as="a">
              <div className="navLink">
                <Icon className="iconLink" size="large" name="gamepad" />
                <label className="">Games</label>
              </div>
            </Menu.Item>
            <Menu.Item as="a">
              <div className="navLink">
                <Icon className="iconLink" size="large" name="camera" />
                <label className="">Channels</label>
              </div>
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={openSidebar}>
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
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Grid.Column>
    </Grid>
  );
};

export default App;
