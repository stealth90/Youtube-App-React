import React from "react";
import { Icon } from "semantic-ui-react";
import "./styles.css";
import SearchBar from "./components/SearchBar/SearchBar";
import YoutubeIcon from "./components/YoutubeIcon";
import ProfilePage from "./components/ProfilePage/ProfilePage";

const Header = ({ onFormSubmit, onOpenSidebar }) => {
  return (
    <div className="header-container">
      <div className="hamburgerIcon" onClick={onOpenSidebar}>
        <Icon size="large" link name="bars" />
      </div>
      <div className="youtubeIcon">
        <YoutubeIcon />
      </div>
      <div className="search-container">
        <SearchBar onFormSubmit={onFormSubmit} />
      </div>
      <Icon
        className="iconSidebar"
        size="large"
        link
        name="plus square outline"
      />
      <Icon className="iconSidebar" size="large" link name="th" />
      <Icon className="iconSidebar" size="large" link name="bell" />
      <ProfilePage />
    </div>
  );
};

export default Header;
