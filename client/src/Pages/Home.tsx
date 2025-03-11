import React, { useState, ChangeEvent, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Accordion from "react-bootstrap/Accordion";
import UserCalender from "../Components/UserCalendar";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import "../assets/home.css";

interface UserInfo {
  id: number;
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
    id: Date.now(),
    activity: "",
    startingTime: 0,
  });

  //Empty array for each activity the user logs
  const [activities, setActivities] = useState<UserInfo[]>(() => {
    const newData = localStorage.getItem("activities");
    return newData ? JSON.parse(newData) : [];
  });
  // Stores logs for each activity and info for said activity in an object
  // The key is a unique timestamp (from Date.now()), used to identify(key object) each activity
  // The value is an array of logs, where each log contains time used, description, and date
  const [activityLogs, setActivityLogs] = useState<{
    [key: number]: ActivityInfo[];
  }>(() => {
    const saved = localStorage.getItem("activityLogs");
    return saved ? JSON.parse(saved) : [];
  });
  // Temporarily stores a single log entry before adding it to activityLogs
  // The key is a unique timestamp (from Date.now()), used to identify the activity
  // The value is a single log entry (not an array), containing time used, description, and date
  // Once submitted, it gets added to the activity in activityLogs
  const [logEntry, setLogEntry] = useState<{ [key: number]: ActivityInfo }>(
    () => {
      const saved = localStorage.getItem("logEntry");
      return saved ? JSON.parse(saved) : [];
    }
  );

  const [editActivity, setEditActivity] = useState<{ [key: number]: number }>(
    {}
  );

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem("logEntry", JSON.stringify(logEntry));
  }, [logEntry]);

  useEffect(() => {
    localStorage.setItem("activityLogs", JSON.stringify(activityLogs));
  }, [activityLogs]);

  // Handing changing activity info
  const handleChangeActivity = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // Spreading all the existing info from the user and be able to type new info in and not override older in (keep state same)
    setUserInfo((currentUserInfo) => ({ ...currentUserInfo, [name]: value }));
  };

  const handleAddActivity = () => {
    // Creating a variable to create a new activity
    // New activity will be an object of pre-existing userInfo, then making the id the date (unique timestamp)
    const newActivity = { ...userInfo, id: Date.now() };
    // keep the current activities the same, and add to the existing array
    setActivities((currentActivities) => [...currentActivities, newActivity]);

    // keep all the current logs the same, adding new activity using its date (unique time stamp) into an empty array
    setActivityLogs((currentActivityLogs) => ({
      // Keep the existing logs and add a new empty array for the new activity
      ...currentActivityLogs,
      [newActivity.id]: [],
    }));

    setLogEntry((currentLogs) => ({
      ...currentLogs,
      // Keep the existing entries and add a new entry with default values for the new activity
      [newActivity.id]: { usedTime: 0, date: "", description: "" },
    }));
    // resetting the user input fields
    setUserInfo({ id: Date.now(), activity: "", startingTime: 0 });
  };

  const handleChangeLogActivityInfo = (
    event: ChangeEvent<HTMLInputElement>,
    activityId: number
  ) => {
    const { name, value } = event.target;
    setLogEntry((currentEntries) => ({
      ...currentEntries,
      [activityId]: { ...currentEntries[activityId], [name]: value },
    }));
  };

  const handleLogTime = (activityId: number) => {
    const entry = logEntry[activityId];
    setActivities((currentActivities) =>
      currentActivities.map((activity) =>
        activity.id === activityId
          ? {
              ...activity,
              startingTime: activity.startingTime - entry.usedTime,
            }
          : activity
      )
    );
    setActivityLogs((currentActivityLogs) => ({
      ...currentActivityLogs,
      [activityId]: [...(currentActivityLogs[activityId] || []), entry],
    }));

    setLogEntry((currentLoggedEntries) => ({
      ...currentLoggedEntries,
      [activityId]: { usedTime: 0, date: "", description: "" },
    }));
  };

  // deleting activity from array and return array without item spliced
  const handleDeleteActivity = (index: number) => {
    setActivities((currentActivities) => {
      const currentActivitiesArray = [...currentActivities];
      currentActivitiesArray.splice(index, 1)[0];
      return currentActivitiesArray;
    });
  };

  // deleting the activity based on key (date) as well as its position in the array
  const handleDeleteActivityInfo = (activityId: number, index: number) => {
    setActivityLogs((currentLogs) => {
      const updatedLogs = { ...currentLogs };
      // Because we are deleting from an object, an if statement is needed
      //copy array over
      updatedLogs[activityId] = [...updatedLogs[activityId]];
      // then proceed to delete from array
      updatedLogs[activityId].splice(index, 1)[0];

      return updatedLogs;
    });
  };

  const handleEditActivity = (activityId: number, index: number) => {
    setEditActivity((currentEdit) => ({
      ...currentEdit,
      [activityId]: index,
    }));
  };

  return (
    <div className="container">
      <Accordion defaultActiveKey="0" className="accordion">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Add New Activity</Accordion.Header>
          <Accordion.Body>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Activity Name"
                onChange={handleChangeActivity}
                value={userInfo.activity}
                name="activity"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              {/* <InputGroup.Text>Hours</InputGroup.Text> */}
              <Form.Control
                type="number"
                placeholder="Hours"
                onChange={handleChangeActivity}
                value={userInfo.startingTime || ""}
                name="startingTime"
              />
            </InputGroup>
            {userInfo.activity && userInfo.startingTime > 0 && (
              <Button variant="primary" onClick={handleAddActivity}>
                Add Activity
              </Button>
            )}
          </Accordion.Body>
        </Accordion.Item>

        {activities.map((activity, index) => (
          <Accordion.Item eventKey={activity.id.toString()} key={activity.id}>
            <Accordion.Header>
              {activity.activity} - {activity.startingTime} hours left
            </Accordion.Header>
            <Accordion.Body>
              <h5>Log Time</h5>
              <InputGroup className="mb-2">
                {/* <InputGroup.Text>Date</InputGroup.Text> */}
                <Form.Control
                  placeholder="Date"
                  type="date"
                  name="date"
                  value={logEntry[activity.id]?.date || ""}
                  onChange={(e) => handleChangeLogActivityInfo(e, activity.id)}
                />
              </InputGroup>
              <InputGroup className="mb-2">
                {/* <InputGroup.Text>Hours Used</InputGroup.Text> */}
                <Form.Control
                  placeholder="Time Used"
                  type="number"
                  name="usedTime"
                  value={logEntry[activity.id]?.usedTime || ""}
                  onChange={(e) => handleChangeLogActivityInfo(e, activity.id)}
                />
              </InputGroup>
              <InputGroup className="mb-2">
                <Form.Control
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={logEntry[activity.id]?.description || ""}
                  onChange={(e) => handleChangeLogActivityInfo(e, activity.id)}
                />
              </InputGroup>
              <Button
                variant="success"
                onClick={() => handleLogTime(activity.id)}
              >
                Log Time
              </Button>

              <h5 className="mt-3">Logged Entries</h5>
              <ListGroup className="activityLogs">
                {(activityLogs[activity.id] || []).map((log, index) => (
                  <>
                    <ListGroup.Item key={index} className="log-entry">
                      <div className="log-details">
                        <span className="log-date">{log.date}</span>
                        <span className="log-time">{log.usedTime} hrs</span>
                      </div>
                      <p className="log-description">{log.description}</p>
                    </ListGroup.Item>

                    <>
                      <Button
                        variant="danger"
                        onClick={() =>
                          handleDeleteActivityInfo(activity.id, index)
                        }
                      >
                        Delete Entry
                      </Button>
                    </>
                  </>
                ))}
              </ListGroup>
              <Button
                className="deleteActivityBtn"
                variant="danger"
                onClick={() => handleDeleteActivity(index)}
              >
                Delete {activity.activity}
              </Button>
            </Accordion.Body>
          </Accordion.Item>
        ))}
        <div className="calendarDiv">
          <UserCalender />
        </div>
      </Accordion>
    </div>
  );
};

export default Home;
