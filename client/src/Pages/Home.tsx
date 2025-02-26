import React, { useState, useEffect, ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Accordion from "react-bootstrap/Accordion";
import "../assets/home.css";
import UserCalendar from "../Components/UserCalendar";

interface UserInfo {
  activity: string;
  startingTime: number;
}

interface ActivityInfo {
  usedTime: number;
  date: string;
  description: string;
}

const Home: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    activity: "",
    startingTime: 0,
  });

  const [userInfoUpdated, setUserInfoUpdated] = useState<ActivityInfo>({
    usedTime: 0,
    date: "",
    description: "",
  });

  const [addActivity, setAddActivity] = useState<UserInfo[]>([]);
  const [addActivityInfo, setAddActivityInfo] = useState<ActivityInfo[]>([]);
  const [toggleSettings, setToggleSettings] = useState<boolean>(false);

  const handleChangeActivity = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleChangeActivityInfo = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleAddActivity = () => {
    setAddActivity([...addActivity, userInfo]);
  };

  const handleAddActivityInfo = () => {
    setAddActivity([...addActivity, userInfo]);
    setUserInfo({
      activity: "",
      startingTime: 0,
    });
  };

  const handleChangeLogActivityInfo = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event?.target;
    setUserInfoUpdated({ ...userInfoUpdated, [name]: value });
  };

  const handleAddLogActivityInfo = () => {
    setAddActivityInfo([...addActivityInfo, userInfoUpdated]);
  };

  const toggleSettingsChange = () => {
    setToggleSettings(!toggleSettings);
  };

  return (
    <div className="container">
      <Accordion defaultActiveKey="0" className="accordion">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Activity</Accordion.Header>
          <Accordion.Body>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Add Activity"
                onChange={handleChangeActivity}
                value={userInfo.activity || ""}
                name="activity"
              />
            </InputGroup>

            <button className="btn-add" onClick={handleAddActivity}>
              Add Activity
            </button>
            {addActivity.map((activity, index) => (
              <div key={index}>
                {!activity.startingTime || !activity.activity ? (
                  ""
                ) : (
                  <>
                    {!userInfoUpdated.usedTime ? (
                      <p>
                        {activity.activity} - {activity.startingTime} Hours
                      </p>
                    ) : (
                      ""
                    )}
                    {/* {!toggleSettings && (
                      <button onClick={() => setToggleSettings(true)}>
                        Edit
                      </button>
                    )} */}
                    {toggleSettings ? (
                      <>
                        <InputGroup className="mb-3">
                          <InputGroup.Text>Used Time</InputGroup.Text>
                          <Form.Control
                            type="number"
                            placeholder="Time"
                            onChange={handleChangeLogActivityInfo}
                            value={userInfoUpdated.usedTime || ""}
                            name="usedTime"
                          />
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroup.Text>Description</InputGroup.Text>
                          <Form.Control
                            type="text"
                            placeholder="Description"
                            onChange={handleChangeLogActivityInfo}
                            value={userInfoUpdated.description || ""}
                            name="description"
                          />
                        </InputGroup>
                        <button
                          onClick={() => {
                            handleAddLogActivityInfo();
                            setToggleSettings(false);
                          }}
                        >
                          Enter Info
                        </button>
                      </>
                    ) : (
                      <p>
                        {userInfoUpdated.usedTime ||
                        userInfoUpdated.description ? (
                          <p>
                            {activity.activity} -
                            {Number(activity.startingTime) -
                              Number(userInfoUpdated.usedTime)}{" "}
                            Hours Remaining - {userInfoUpdated.description}
                          </p>
                        ) : (
                          ""
                        )}
                        {!toggleSettings && (
                          <button onClick={() => setToggleSettings(true)}>
                            Update Info
                          </button>
                        )}
                      </p>
                    )}
                  </>
                )}
                {!activity.startingTime || !activity.startingTime ? (
                  <>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Dedicated Time</InputGroup.Text>
                      <Form.Control
                        type="number"
                        placeholder="Time"
                        onChange={handleChangeActivityInfo}
                        value={userInfo.startingTime}
                        name="startingTime"
                      />
                    </InputGroup>
                    {!toggleSettings && !activity.activity && (
                      <button onClick={handleAddActivityInfo}>
                        Enter Time
                      </button>
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="userCalenderDiv">
        <UserCalendar />
      </div>
    </div>
  );
};

export default Home;
