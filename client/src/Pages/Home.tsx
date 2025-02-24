import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Accordion from "react-bootstrap/Accordion";
import "../assets/home.css";
import UserCalendar from "../Components/UserCalendar";

interface UserInfo {
  vacation: number;
  sick: number;
  fmal: number;
  optionalHoliday: number;
  other: number;
}

interface UserInfoUpdated {
  vacationUpdated: number;
  dateVacationUsed: number;
  vacationDescription: string;
  sickUpdated: number;
  dateSickUpdated: number;
  sickDescription: string;
  fmalUpdated: number;
  dateFmalUpdated: number;
  fmalDescription: string;
  optionalHolidayUpdated: number;
  dateOptionalHolidayUpdated: number;
  optionalHolidayDescription: string;
  otherUpdated: number;
  dateOtherUpdated: number;
  otherDescription: string;
}

const Home: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    vacation: 0,
    sick: 0,
    optionalHoliday: 0,
    fmal: 0,
    other: 0,
  });
  const [userInfoUpdated, setUserInfoUpdated] = useState<UserInfoUpdated>({
    vacationUpdated: 0,
    dateVacationUsed: 0,
    vacationDescription: "",
    sickUpdated: 0,
    dateSickUpdated: 0,
    sickDescription: "",
    fmalUpdated: 0,
    dateFmalUpdated: 0,
    fmalDescription: "",
    optionalHolidayUpdated: 0,
    dateOptionalHolidayUpdated: 0,
    optionalHolidayDescription: "",
    otherUpdated: 0,
    dateOtherUpdated: 0,
    otherDescription: "",
  });

  const [addVacationInfo, setAddVacationInfo] = useState<UserInfoUpdated[]>([]);
  const [addSickInfo, setAddSickInfo] = useState<UserInfoUpdated[]>([]);
  const [addFmalInfo, setAddFmalInfo] = useState<UserInfoUpdated[]>([]);
  const [addOptionalHolidayInfo, setAddOptionalHolidayInfo] = useState<
    UserInfoUpdated[]
  >([]);

  const [addOtherInfo, setAddOtherInfo] = useState<UserInfoUpdated[]>([]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    // Passing `setState` function to handle changes for fields related to the UserInfoUpdated state
    setState: React.Dispatch<React.SetStateAction<UserInfoUpdated>>
  ) => {
    const { name, value } = event.target;

    // Update the state by spreading the current state and updating the specific field based on the input name
    setState((currentUseState: any) => ({
      ...currentUseState,
      [name]:
        // If the name of the field includes "Updated" and doesn't include "date", treat the value as a number.
        // Otherwise, treat it as a string (default behavior for most form fields)
        name.includes("Updated") && !name.includes("date")
          ? Number(value) // Convert value to number if "Updated" and not "date"
          : value, // Otherwise, keep the value as a string
    }));
  };

  const handleAddVacationInfo = () => {
    // If any vacation fields are missing, stop and show an alert.
    if (
      !userInfo.vacation ||
      !userInfoUpdated.vacationUpdated ||
      !userInfoUpdated.dateVacationUsed
    ) {
      alert("Not added. Missing Information.");
      return;
    }

    // Adding the new vacation info by spreading out the current vacation info
    setAddVacationInfo((currentVacationInfo) => [
      ...currentVacationInfo, // Keeps all existing vacation info from array
      userInfoUpdated, // Adds the new vacation entry to the array
    ]);

    // Updating the vacation balance/value in userInfo
    setUserInfo((currentUserInfo) => ({
      ...currentUserInfo, // Spreading out all user info so nothing else changes
      vacation:
        Number(currentUserInfo.vacation) - // Taking the current vacation balance
        Number(userInfoUpdated.vacationUpdated), // Subtracting the newly used vacation time
    }));
    //Clearing all the use states once submitted
    setUserInfoUpdated({
      vacationUpdated: 0,
      dateVacationUsed: 0,
      vacationDescription: "",
      sickUpdated: 0,
      dateSickUpdated: 0,
      sickDescription: "",
      fmalUpdated: 0,
      dateFmalUpdated: 0,
      fmalDescription: "",
      optionalHolidayUpdated: 0,
      dateOptionalHolidayUpdated: 0,
      optionalHolidayDescription: "",
      otherUpdated: 0,
      dateOtherUpdated: 0,
      otherDescription: "",
    });
  };

  const handleAddSickInfo = () => {
    if (
      !userInfo.sick ||
      !userInfoUpdated.sickUpdated ||
      !userInfoUpdated.dateSickUpdated ||
      !userInfoUpdated.sickDescription
    ) {
      alert("Not added. Missing Information.");
      return;
    }
    setAddSickInfo((currentSickInfo) => [...currentSickInfo, userInfoUpdated]);
    setUserInfo((currentUserInfo) => ({
      ...currentUserInfo,
      sick: Number(currentUserInfo.sick) - Number(userInfoUpdated.sickUpdated),
    }));
    setUserInfoUpdated({
      vacationUpdated: 0,
      dateVacationUsed: 0,
      vacationDescription: "",
      sickUpdated: 0,
      dateSickUpdated: 0,
      sickDescription: "",
      fmalUpdated: 0,
      dateFmalUpdated: 0,
      fmalDescription: "",
      optionalHolidayUpdated: 0,
      dateOptionalHolidayUpdated: 0,
      optionalHolidayDescription: "",
      otherUpdated: 0,
      dateOtherUpdated: 0,
      otherDescription: "",
    });
  };

  const handleAddFmalInfo = () => {
    if (
      !userInfo.fmal ||
      !userInfoUpdated.fmalUpdated ||
      !userInfoUpdated.dateFmalUpdated ||
      !userInfoUpdated.fmalDescription
    ) {
      alert("Not added. Missing Information.");
      return;
    }
    setAddFmalInfo((currentFmalInfo) => [...currentFmalInfo, userInfoUpdated]);
    setUserInfo((currentUserInfo) => ({
      ...currentUserInfo,
      fmal: Number(currentUserInfo.fmal) - Number(userInfoUpdated.fmalUpdated),
    }));
    setUserInfoUpdated({
      vacationUpdated: 0,
      dateVacationUsed: 0,
      vacationDescription: "",
      sickUpdated: 0,
      dateSickUpdated: 0,
      sickDescription: "",
      fmalUpdated: 0,
      dateFmalUpdated: 0,
      fmalDescription: "",
      optionalHolidayUpdated: 0,
      dateOptionalHolidayUpdated: 0,
      optionalHolidayDescription: "",
      otherUpdated: 0,
      dateOtherUpdated: 0,
      otherDescription: "",
    });
  };

  const handleAddOptionalHolidayInfo = () => {
    if (
      !userInfo.optionalHoliday ||
      !userInfoUpdated.optionalHolidayUpdated ||
      !userInfoUpdated.dateOptionalHolidayUpdated ||
      !userInfoUpdated.optionalHolidayDescription
    ) {
      alert("Not added. Missing Information.");
      return;
    }
    setAddOptionalHolidayInfo((currentOptionalHolidayInfo) => [
      ...currentOptionalHolidayInfo,
      userInfoUpdated,
    ]);
    setUserInfo((currentUserInfo) => ({
      ...currentUserInfo,
      optionalHoliday:
        currentUserInfo.optionalHoliday -
        userInfoUpdated.optionalHolidayUpdated,
    }));
    setUserInfoUpdated({
      vacationUpdated: 0,
      dateVacationUsed: 0,
      vacationDescription: "",
      sickUpdated: 0,
      dateSickUpdated: 0,
      sickDescription: "",
      fmalUpdated: 0,
      dateFmalUpdated: 0,
      fmalDescription: "",
      optionalHolidayUpdated: 0,
      dateOptionalHolidayUpdated: 0,
      optionalHolidayDescription: "",
      otherUpdated: 0,
      dateOtherUpdated: 0,
      otherDescription: "",
    });
  };

  const handleAddOtherInfo = () => {
    if (
      !userInfo.other ||
      !userInfoUpdated.otherUpdated ||
      !userInfoUpdated.dateOtherUpdated ||
      !userInfoUpdated.otherDescription
    ) {
      alert("Not added. Missing Information.");
      return;
    }
    setAddOtherInfo((currentOtherInfo) => [
      ...currentOtherInfo,
      userInfoUpdated,
    ]);
    setUserInfo((currentOtherInfo) => ({
      ...currentOtherInfo,
      other:
        Number(currentOtherInfo.other) - Number(userInfoUpdated.otherUpdated),
    }));
    setUserInfoUpdated({
      vacationUpdated: 0,
      dateVacationUsed: 0,
      vacationDescription: "",
      sickUpdated: 0,
      dateSickUpdated: 0,
      sickDescription: "",
      fmalUpdated: 0,
      dateFmalUpdated: 0,
      fmalDescription: "",
      optionalHolidayUpdated: 0,
      dateOptionalHolidayUpdated: 0,
      optionalHolidayDescription: "",
      otherUpdated: 0,
      dateOtherUpdated: 0,
      otherDescription: "",
    });
  };

  const handleDeleteVacationInfo = (index: number) => {
    setAddVacationInfo((currentVacationInfo) => {
      // Making a copy of the vacation info array so we don’t modify state directly
      const newInfo = [...currentVacationInfo];

      // Removing 1 item at the specified index from the array
      const infoToDelete = newInfo.splice(index, 1)[0];
      // `splice(index, 1)` removes the item and returns an array with the removed item.
      // `[0]` grabs the first (and only) item from that array so we can work with the actual value instead of an array (because it is a number()). This deleted item is stored in the userInfo array and is used to determine the updated value.

      // Updating user info by changing the vacation value
      setUserInfo((currentUserInfo) => ({
        ...currentUserInfo, // Keeping all existing user info
        vacation:
          Number(currentUserInfo.vacation) + // Convert current vacation value to a number so we can use it mathematically
          Number(infoToDelete.vacationUpdated), // Add the removed vacation value (also convert to a number)
        // Making sure we’re working with numbers to avoid weird string issues
      }));

      // Returning the updated vacation array without the deleted item
      return newInfo;
    });
  };

  const handleDeleteFmalInfo = (index: number) => {
    setAddFmalInfo((currentFmalInfo) => {
      const newInfo = [...currentFmalInfo];
      const infoToDelete = newInfo.splice(index, 1)[0];

      setUserInfo((currentUserInfo) => ({
        ...currentUserInfo,
        fmal: Number(currentUserInfo.fmal) + Number(infoToDelete.fmalUpdated),
      }));

      return newInfo;
    });
  };

  const handleDeleteOptionalHolidayInfo = (index: number) => {
    setAddOptionalHolidayInfo((currentOptionalHolidayInfo) => {
      const newInfo = [...currentOptionalHolidayInfo];
      const infoToDelete = currentOptionalHolidayInfo.splice(index, 1)[0];

      setUserInfo((currentUserInfo) => ({
        ...currentUserInfo,
        optionalHoliday:
          Number(currentUserInfo.optionalHoliday) +
          Number(infoToDelete.optionalHolidayUpdated),
      }));

      return newInfo;
    });
  };

  const handleDeleteOtherInfo = (index: number) => {
    setAddOtherInfo((currentOtherInfo) => {
      const newInfo = [...currentOtherInfo];
      const infoToDelete = currentOtherInfo.splice(index, 1)[0];

      setUserInfo((currentUserInfo) => ({
        ...currentUserInfo,
        other:
          Number(currentUserInfo.other) + Number(infoToDelete.otherUpdated),
      }));

      return newInfo;
    });
  };

  useEffect(() => {
    try {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } catch (error) {
      console.error("Error saving userInfo to localStorage", error);
    }
  }, [userInfo]);

  useEffect(() => {
    try {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
    } catch (error) {
      console.error("Error loading userInfo from localStorage", error);
    }
  }, []);

  return (
    <div className="container">
      <Accordion defaultActiveKey="0" className="accordion">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Vacation</Accordion.Header>
          <Accordion.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text>Vacation Hours</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Vacation"
                onChange={(e) => handleChange(e, setUserInfo)}
                value={userInfo.vacation}
                name="vacation"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Vacation Hours Used</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Vacation Hours Used"
                onChange={(e) => handleChange(e, setUserInfoUpdated)}
                value={userInfoUpdated.vacationUpdated}
                name="vacationUpdated"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Date Vacation Used</InputGroup.Text>
              <Form.Control
                type="date"
                placeholder="Date Vacation Used"
                onChange={(e) => handleChange(e, setUserInfoUpdated)}
                value={userInfoUpdated.dateVacationUsed}
                name="dateVacationUsed"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Description</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Description"
                onChange={(e) => handleChange(e, setUserInfoUpdated)}
                value={userInfoUpdated.vacationDescription}
                name="vacationDescription"
              />
            </InputGroup>
            <button className="btn-add" onClick={handleAddVacationInfo}>
              Add Info
            </button>
            <div>
              {addVacationInfo.map((info, index) => (
                <div key={index} className="info-item">
                  <p>Vacation Hours Used: {info.vacationUpdated}</p>
                  <p>Date Vacation Used: {info.dateVacationUsed}</p>
                  <p>Description: {info.vacationDescription}</p>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteVacationInfo(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
              <div>
                <p>Hours Remaining: {userInfo.vacation}</p>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Sick</Accordion.Header>
          <Accordion.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text>Sick Hours</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Sick Hours"
                onChange={(e) => handleChange(e, setUserInfo)}
                value={userInfo.sick}
                name="sick"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Sick Hours Used</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Sick Hours Used"
                onChange={(e) => handleChange(e, setUserInfoUpdated)}
                value={userInfoUpdated.sickUpdated}
                name="sickUpdated"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Date Sick Used</InputGroup.Text>
              <Form.Control
                type="date"
                placeholder="Date Sick Used"
                onChange={(e) => handleChange(e, setUserInfoUpdated)}
                value={userInfoUpdated.dateSickUpdated}
                name="dateSickUpdated"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Description</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Description"
                onChange={(e) => handleChange(e, setUserInfoUpdated)}
                value={userInfoUpdated.sickDescription}
                name="sickDescription"
              />
            </InputGroup>
            <button className="btn-add" onClick={handleAddSickInfo}>
              Add Sick Time
            </button>
            <div>
              {addSickInfo.map((info, index) => (
                <div key={index} className="info-item">
                  <p>Sick Hours Used: {info.sickUpdated}</p>
                  <p>Date Sick Used: {info.dateSickUpdated}</p>
                  <p>Description: {info.sickDescription}</p>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteSickInfo(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
              <div>
                <p>Hours Remaining: {userInfo.sick}</p>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>fmal</Accordion.Header>
          <Accordion.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text>fmal Hours</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="fmal"
                onChange={(e) => handleChange(e, setUserInfo)}
                value={userInfo.fmal}
                name="fmal"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>fmal Hours Used</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="fmal Hours Used"
                onChange={(e) => handleChange(e, setUserInfoUpdated)}
                value={userInfoUpdated.fmalUpdated}
                name="fmalUpdated"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Date fmal Used</InputGroup.Text>
              <Form.Control
                type="date"
                placeholder="Date fmal Used"
                onChange={(e) => handleChange(e, setUserInfoUpdated)}
                value={userInfoUpdated.dateFmalUpdated}
                name="dateFmalUpdated"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Description</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Description"
                onChange={(e) => handleChange(e, setUserInfoUpdated)}
                value={userInfoUpdated.fmalDescription}
                name="fmalDescription"
              />
            </InputGroup>
            <button className="btn-add" onClick={handleAddFmalInfo}>
              Add fmal Time
            </button>
            <div>
              {addFmalInfo.map((info, index) => (
                <div key={index} className="info-item">
                  <p>fmal Hours Used: {info.fmalUpdated}</p>
                  <p>Date fmal Used: {info.dateFmalUpdated}</p>
                  <p>Description: {info.fmalDescription}</p>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteFmalInfo(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
              <div>
                <p>Hours Remaining: {userInfo.fmal}</p>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Optional Holiday</Accordion.Header>
          <Accordion.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text>Optional Holiday Hours</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Optional Holiday"
                onChange={(e) => handleChange(e, setUserInfo)}
                value={userInfo.optionalHoliday}
                name="optionalHoliday"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Optional Holiday Hours Used</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Optional Holiday Hours Used"
                onChange={(e) => handleChange(e, setUserInfoUpdated)}
                value={userInfoUpdated.optionalHolidayUpdated}
                name="optionalHolidayUpdated"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Date Optional Holiday Used</InputGroup.Text>
              <Form.Control
                type="date"
                placeholder="Date Optional Holiday Used"
                onChange={(e) => handleChange(e, setUserInfoUpdated)}
                value={userInfoUpdated.dateOptionalHolidayUpdated}
                name="dateOptionalHolidayUpdated"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Description</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Description"
                onChange={(e) => handleChange(e, setUserInfoUpdated)}
                value={userInfoUpdated.optionalHolidayDescription}
                name="optionalHolidayDescription"
              />
            </InputGroup>
            <button className="btn-add" onClick={handleAddOptionalHolidayInfo}>
              Add Optional Holiday Time
            </button>
            <div>
              {addOptionalHolidayInfo.map((info, index) => (
                <div key={index} className="info-item">
                  <p>
                    Optional Holiday Hours Used: {info.optionalHolidayUpdated}
                  </p>
                  <p>
                    Date Optional Holiday Used:{" "}
                    {info.dateOptionalHolidayUpdated}
                  </p>
                  <p>Description: {info.optionalHolidayDescription}</p>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteOptionalHolidayInfo(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
              <div>
                <p>Hours Remaining: {userInfo.optionalHoliday}</p>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>Other</Accordion.Header>
          <Accordion.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text>Other Hours</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Other"
                onChange={(e) => handleChange(e, setUserInfo)}
                value={userInfo.other}
                name="other"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Other Hours Used</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Other Hours Used"
                onChange={(e) => handleChange(e, setUserInfoUpdated)}
                value={userInfoUpdated.otherUpdated}
                name="otherUpdated"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Date Other Used</InputGroup.Text>
              <Form.Control
                type="date"
                placeholder="Date Other Used"
                onChange={(e) => handleChange(e, setUserInfoUpdated)}
                value={userInfoUpdated.dateOtherUpdated}
                name="dateOtherUpdated"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Description</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Description"
                onChange={(e) => handleChange(e, setUserInfoUpdated)}
                value={userInfoUpdated.otherDescription}
                name="otherDescription"
              />
            </InputGroup>
            <button className="btn-add" onClick={handleAddOtherInfo}>
              Add Other Time
            </button>
            <div>
              {addOtherInfo.map((info, index) => (
                <div key={index} className="info-item">
                  <p>Other Hours Used: {info.otherUpdated}</p>
                  <p>Date Other Used: {info.dateOtherUpdated}</p>
                  <p>Description: {info.otherDescription}</p>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteOtherInfo(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
              <div>
                <p>Hours Remaining: {userInfo.other}</p>
              </div>
            </div>
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
