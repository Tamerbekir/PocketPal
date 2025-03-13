import React, { useState, ChangeEvent, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import "../assets/home.css";

interface UserInfo {
  id: number;
  activity: string;
  startingTime: number;
  tracker: string;
  length: string;
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
    tracker: "",
    length: "",
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

  const [openPanel, setOpenPanel] = useState<number | null>(null);
  const [openOptions, setOpenOptions] = useState<number | null>(null);

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
    setUserInfo({
      id: Date.now(),
      activity: "",
      startingTime: 0,
      tracker: "",
      length: "",
    });
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
              startingTime:
                Number(activity.startingTime) - Number(entry.usedTime),
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
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this activity? This is irreversible`
    );

    if (confirmDelete) {
      setActivities((currentActivities) => {
        const currentActivitiesArray = [...currentActivities];
        currentActivitiesArray.splice(index, 1)[0];
        return currentActivitiesArray;
      });
    } else {
      alert("Canceled");
    }
  };

  // deleting the activity based on key (date) as well as its position in the array
  const handleDeleteActivityInfo = (activityId: number, index: number) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this this activity info? This is irreversible`
    );

    if (confirmDelete) {
      setActivityLogs((currentLogs) => {
        const updatedLogs = { ...currentLogs };
        const deletedEntry = updatedLogs[activityId][index];

        // Because we are deleting from an object, an if statement is needed
        //copy array over
        updatedLogs[activityId] = [...updatedLogs[activityId]];
        // then proceed to delete from array
        updatedLogs[activityId].splice(index, 1)[0];

        //mapping over all activities, and if the current activity matches the index when deleting, set the value for the starting time by adding back the used time to the starting time
        setActivities((currentActivities) =>
          currentActivities.map((activity) =>
            activity.id === activityId
              ? {
                  ...activity,
                  startingTime:
                    Number(activity.startingTime) +
                    Number(deletedEntry.usedTime),
                }
              : activity
          )
        );

        return updatedLogs;
      });
    } else {
      alert("Canceled");
    }
  };

  // const handleEditActivity = (activityId: number, index: number) => {
  //   setEditActivity((currentEdit) => ({
  //     ...currentEdit,
  //     [activityId]: index,
  //   }));
  // };

  return (
    <>
      <h1 className="header">Pocket Pal</h1>

      <div className="container">
        {/* <h3 className="section-title">Add New Activity</h3> */}
        <div className="activity-form">
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Add new activity"
              onChange={handleChangeActivity}
              value={userInfo.activity}
              name="activity"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              type="number"
              placeholder="Add Amount"
              onChange={handleChangeActivity}
              value={userInfo.startingTime || ""}
              name="startingTime"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="What are you tracking?"
              onChange={handleChangeActivity}
              value={userInfo.tracker || ""}
              name="tracker"
            />
          </InputGroup>
          <p>How long do you wish to track this activity?</p>
          <InputGroup className="mb-3">
            <Form.Control
              type="date"
              placeholder="Long long do you want to track this?"
              onChange={handleChangeActivity}
              value={userInfo.length || ""}
              name="length"
            />
          </InputGroup>
          {userInfo.activity && userInfo.startingTime > 0 && (
            <button className="addActivityBtn" onClick={handleAddActivity}>
              Add Activity
            </button>
          )}
        </div>

        {activities.length < 1 ? (
          <p className="section-title">
            Seems like you don't have any activities yet...
          </p>
        ) : (
          <h3 className="section-title">Activities</h3>
        )}

        {activities.map((activity, index) => (
          <div key={activity.id} className="activity-panel">
            <div
              className="panel-header"
              onClick={() => setOpenPanel(openPanel === index ? null : index)}
            >
              {activity.activity} - {activity.startingTime} {activity.tracker}{" "}
              left
              <button
                className="delete-activity-btn"
                onClick={() => handleDeleteActivity(index)}
              >
                Delete {activity.activity}
              </button>
            </div>
            {openPanel === index && (
              <div className="panel-body">
                <h5>Log Time</h5>
                <InputGroup className="mb-2">
                  <Form.Control
                    placeholder="Date"
                    type="date"
                    name="date"
                    value={logEntry[activity.id]?.date || ""}
                    onChange={(e) =>
                      handleChangeLogActivityInfo(e, activity.id)
                    }
                  />
                </InputGroup>
                <InputGroup className="mb-2">
                  <Form.Control
                    placeholder="Time Used"
                    type="number"
                    name="usedTime"
                    value={logEntry[activity.id]?.usedTime || ""}
                    onChange={(e) =>
                      handleChangeLogActivityInfo(e, activity.id)
                    }
                  />
                </InputGroup>
                <InputGroup className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={logEntry[activity.id]?.description || ""}
                    onChange={(e) =>
                      handleChangeLogActivityInfo(e, activity.id)
                    }
                  />
                </InputGroup>
                <button onClick={() => handleLogTime(activity.id)}>
                  Log Time
                </button>

                <h5 className="mt-3">Logged Entries</h5>
                <ListGroup className="activityLogs">
                  {(activityLogs[activity.id] || []).map((log, logIndex) => (
                    <ListGroup.Item key={logIndex} className="log-entry">
                      <div className="log-details">
                        <span className="log-date">{log.date}</span>
                        <span className="log-time">{log.usedTime}</span>
                        {tracker.map((track, index) => (
                          <p key={index}>track.tracker</p>
                        ))}
                      </div>
                      <p className="log-description">{log.description}</p>
                      <button
                        onClick={() =>
                          setOpenOptions(
                            openOptions === logIndex ? null : logIndex
                          )
                        }
                      >
                        {openOptions === logIndex ? "Close" : "Options"}
                      </button>
                      {openOptions === logIndex && (
                        <>
                          <button onClick={() => handleLogTime(activity.id)}>
                            Edit
                          </button>
                          <button
                            className="deleteEntryBtn"
                            onClick={() =>
                              handleDeleteActivityInfo(activity.id, logIndex)
                            }
                          >
                            Delete Entry
                          </button>
                        </>
                      )}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
