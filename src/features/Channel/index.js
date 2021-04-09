import React, { useEffect, useState } from "react";
import { from } from "rxjs";
import { Button, Dimmer, Loader, Image, Tab, Menu } from "semantic-ui-react";
import youtube, { channelParams } from "../../apis/youtube";
import "./styles.css";

const ChannelComponent = (props) => {
  const [myChannel, setMyChannel] = useState();
  useEffect(() => {
    const subscription$ = from(
      youtube.get("/channels", {
        params: {
          ...channelParams,
        },
      })
    ).subscribe((response) => {
      console.log("CHANNEL", response.data.items[0]);
      setMyChannel(response.data.items[0]);
    });
    return () => {
      subscription$.unsubscribe();
    };
  }, []);

  const panes = [
    {
      menuItem: "HOME",
      render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>,
    },
    {
      menuItem: "VIDEO",
      render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
    },
    {
      menuItem: "PLAYLIST",
      render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
    },
    {
      menuItem: "CANALI",
      render: () => <Tab.Pane attached={false}>Tab 4 Content</Tab.Pane>,
    },
    {
      menuItem: "INFORMAZIONI",
      render: () => <Tab.Pane attached={false}>Tab 5 Content</Tab.Pane>,
    },
    {
      menuItem: { key: "search", icon: "search" },
      render: () => <Tab.Pane attached={false}>Tab 6 Content</Tab.Pane>,
    },
  ];

  return !myChannel ? (
    <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
  ) : (
    <>
      <div
        className="banner-channel"
        style={{
          backgroundImage: `url(${myChannel.brandingSettings.image.bannerExternalUrl})`,
        }}
      >
        <div className="banner-social-link">
          <a href="#t">Twich</a>
          <a href="#r">FB</a>
          <a href="#r">IG</a>
        </div>
      </div>
      <div className="channel-info">
        <div className="head-info">
          <div className="profile-info">
            <Image
              className="align-center"
              size="tiny"
              avatar
              alt="profile imag"
              src={myChannel.snippet.thumbnails.medium.url}
            />
            <div className="profile-name">
              <h2>{myChannel.brandingSettings.channel.title}</h2>
              <p>{myChannel.statistics.subscriberCount} iscritti</p>
            </div>
          </div>
          <div className="action-info">
            <Button primary>{"Personalizza canale".toUpperCase()}</Button>
            <Button primary>{"Gestisci video".toUpperCase()}</Button>
          </div>
        </div>
        <div className="nav-info">
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </div>
      </div>
    </>
  );
};

export default ChannelComponent;
