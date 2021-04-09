import React, { useState, useEffect } from "react";
import { Grid, Segment, Sidebar, Menu, Icon } from "semantic-ui-react";
import youtube, { baseParams } from "../apis/youtube";
import HomeComponent from "../features/Home";
import ChannelComponent from "../features/Channel";
import Header from "./Header";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = (props) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState();

  const onVideoSelect = (video) => {
    setSelectedVideo(video);
  };

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
  const handleOpenSidebar = () => {
    console.log("open");
    setOpenSidebar(!openSidebar);
  };

  return (
    <Router>
      <Grid columns={1}>
        <Grid.Column>
          <Header
            onOpenSidebar={handleOpenSidebar}
            onFormSubmit={onTermSubmit}
          />
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
              <Menu.Item key="home" as="a">
                <div className="navLink">
                  <Icon className="iconLink" size="large" name="home" />
                  <label className="">Home</label>
                </div>
              </Menu.Item>
              <Menu.Item key="games" as="a">
                <div className="navLink">
                  <Icon className="iconLink" size="large" name="gamepad" />
                  <label className="">Games</label>
                </div>
              </Menu.Item>
              <Menu.Item key="channels" as="a">
                <div className="navLink">
                  <Icon className="iconLink" size="large" name="camera" />
                  <label className="">Channels</label>
                </div>
              </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher dimmed={openSidebar}>
              <Switch>
                <Route path="/channel">
                  <ChannelComponent />
                </Route>
                <Route path="/">
                  {videos && (
                    <HomeComponent
                      videos={videos}
                      selectedVideo={selectedVideo}
                      onVideoSelect={onVideoSelect}
                    />
                  )}
                </Route>
              </Switch>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Grid.Column>
      </Grid>
    </Router>
  );
};

export default App;
