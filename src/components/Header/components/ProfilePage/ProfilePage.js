import React, { useState, useEffect } from "react";
import { Image, Dropdown } from "semantic-ui-react";
import logo from "../../../../images/elliot.jpeg";
import "./ProfilePage.css";
import { gapi, loadAuth2 } from "gapi-script";
import { Link } from "react-router-dom";

const ProfilePage = ({ onFormSubmit }) => {
  const [user, setUser] = useState(null);

  const CLIENT_ID =
    "193182057116-nt9m4tbghtqr3gglnt8oggtiajle2isj.apps.googleusercontent.com";
  const SCOPE = "https://www.googleapis.com/auth/youtube.readonly";
  /*   const discoveryUrl = [
    "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
  ]; */
  const trigger = (iconSize, urlImg = null) => (
    <Image
      className="align-center"
      size={iconSize}
      avatar
      alt="profile imag"
      src={urlImg || logo}
    />
  );
  useEffect(() => {
    onInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onInit = async () => {
    const auth2 = await loadAuth2(gapi, CLIENT_ID, SCOPE);
    console.log("auth2", auth2);
    if (auth2.isSignedIn.get()) {
      updateUser(auth2.currentUser.get());
    }
    /* updateUser(auth2); */
  };

  const login = async () => {
    await gapi.auth2.getAuthInstance().signIn();
    const auth2 = await loadAuth2(gapi, CLIENT_ID, SCOPE);
    updateUser(auth2.currentUser.get());
  };

  const updateUser = (currentUser) => {
    console.log("currentUser", currentUser.getBasicProfile());
    const name = currentUser.getBasicProfile().getName();
    const profileImg = currentUser.getBasicProfile().getImageUrl();
    const email = currentUser.getBasicProfile().getEmail();
    console.log("profileImg", profileImg);
    setUser({
      name,
      email,
      profileImg,
    });
  };

  const signOut = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      setUser(null);
      console.log("User signed out.");
    });
  };

  return (
    <Dropdown
      pointing="right"
      icon={null}
      trigger={trigger("mini", user ? user.profileImg : null)}
    >
      <Dropdown.Menu>
        <Dropdown.Header as="div">
          {user ? (
            <div className="dropdown-header">
              {trigger("tiny", user ? user.profileImg : null)}
              <div className="details">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
            </div>
          ) : (
            <div className="dropdown-header">{trigger("tiny")}</div>
          )}
        </Dropdown.Header>
        <Dropdown.Divider />
        {user ? (
          <Dropdown.Item onClick={signOut} icon="sign-out" text="Esci" />
        ) : (
          <Dropdown.Item onClick={login} icon="sign-in" text="Accedi" />
        )}
        <Dropdown.Item
          as={Link}
          to="/channel"
          icon="id badge"
          text="Il tuo canale"
        ></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfilePage;
