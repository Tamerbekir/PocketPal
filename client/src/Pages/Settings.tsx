import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { ChangeEvent, useEffect, useState } from "react";
import "../assets/settings.css";
import { stringify } from "querystring";
const Settings = () => {
  interface UserInfo {
    name: string;
    email: string;
  }

  const [userInfo, setUserInfo] = useState<UserInfo>(() => {
    const saveInfo = localStorage.getItem("userInfo");
    return saveInfo
      ? JSON.parse(saveInfo)
      : {
          name: "",
          email: "",
        };
  });

  const [toggleSettings, setToggleSettings] = useState<boolean>(false);

  const handleSettingsChange = () => {
    setToggleSettings(!toggleSettings);
  };

  const handleUserInfoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Updates the user's name or email in state as they type.
    // Also updates local storage immediately to persist changes across refreshes.
    setUserInfo((currentUserInfo) => {
      const updateUserInfo = { ...currentUserInfo, [name]: value };
      localStorage.setItem("userInfo", JSON.stringify(updateUserInfo));
      return updateUserInfo;
    });
  };

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  useEffect(() => {
    const storedSettings = localStorage.getItem("userInfo");

    if (storedSettings) {
      setUserInfo(JSON.parse(storedSettings));
    }
  }, []);

  return (
    <div>
      <h1 className="settingsHeader">Settings</h1>
      <div className="settingsContainer">
        {!toggleSettings ? (
          <>
            <p>{!userInfo.name ? "No Name" : <p>Name: {userInfo.name}</p>}</p>
            <p>
              {!userInfo.email ? "No Email" : <p>Email: {userInfo.email}</p>}
            </p>
          </>
        ) : (
          <>
            <Form.Label htmlFor="basic-url">Name</Form.Label>
            <InputGroup className="mb-3 settingsInput">
              <Form.Control
                id="basic-url"
                aria-describedby="basic-addon3"
                onChange={handleUserInfoChange}
                value={userInfo.name}
                name="name"
              />
            </InputGroup>
            <Form.Label htmlFor="basic-url">Email</Form.Label>
            <InputGroup className="mb-3 settingsInput">
              <Form.Control
                id="basic-url"
                aria-describedby="basic-addon3"
                onChange={handleUserInfoChange}
                value={userInfo.email}
                name="email"
              />
            </InputGroup>
          </>
        )}
        <Button onClick={handleSettingsChange}>
          {!toggleSettings ? "Change" : "Save"}
        </Button>
      </div>
    </div>
  );
};
export default Settings;
