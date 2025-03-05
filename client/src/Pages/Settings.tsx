import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { ChangeEvent, useEffect, useState } from "react";
import "../assets/settings.css";
const Settings = () => {
  interface UserInfo {
    name: string;
    notes: string;
  }

  const [userInfo, setUserInfo] = useState<UserInfo>(() => {
    const saveInfo = localStorage.getItem("userInfo");
    return saveInfo
      ? JSON.parse(saveInfo)
      : {
          name: "",
          notes: "",
        };
  });

  const [toggleSettings, setToggleSettings] = useState<boolean>(false);

  const handleSettingsChange = () => {
    setToggleSettings(!toggleSettings);
    //once the user hits save btn it will log the data in local storage
    setUserInfo((currentUserInfo) => {
      const updateUserInfo = { ...currentUserInfo };
      localStorage.setItem("userInfo", JSON.stringify(updateUserInfo));
      return updateUserInfo;
    });
  };

  const handleUserInfoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Updates the user's name or notes in state as they type.
    // Also updates local storage immediately to persist changes across refreshes.
    setUserInfo({ ...userInfo, [name]: value });
  };

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
            {/* <p>{!userInfo.name ? "No Name" : <p>Name: {userInfo.name}</p>}</p> */}
            <p>
              {!userInfo.notes ? "No notes" : <p>Notes: {userInfo.notes}</p>}
            </p>
          </>
        ) : (
          <>
            {/* <Form.Label htmlFor="basic-url">Name</Form.Label>
            <InputGroup className="mb-3 settingsInput">
              <Form.Control
                id="basic-url"
                aria-describedby="basic-addon3"
                onChange={handleUserInfoChange}
                value={userInfo.name}
                name="name"
              />
            </InputGroup> */}
            <Form.Label htmlFor="basic-url">Notes</Form.Label>
            <Form.Label className="mb-3 settingsInput">
              <textarea
                className="notesInput"
                style={{ whiteSpace: "pre-wrap" }}
                id="basic-url"
                aria-describedby="basic-addon3"
                onChange={handleUserInfoChange}
                value={userInfo.notes}
                name="notes"
              />
            </Form.Label>
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
