import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { ChangeHandler, useState } from "react";
import "../assets/settings.css";
const Settings = () => {
  interface UserInfo {
    name: string;
    email: string;
  }

  const [userInfo, setChangeUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
  });

  const [toggleSettings, setToggleSettings] = useState<boolean>(false);

  const handleSettingsChange = () => {
    setToggleSettings(!toggleSettings);
  };

  const handleUserInfoChange = (event: ChangeHandler<HTMLInputElement>) => {
    const { name, value } = event.target;
    setChangeUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <div>
      <h1 className="settingsHeader">Settings</h1>
      <div className="settingsContainer">
        {toggleSettings ? (
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
          {!toggleSettings ? "Save" : "Change"}
        </Button>
      </div>
    </div>
  );
};
export default Settings;
