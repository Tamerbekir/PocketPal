import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Accordion from "react-bootstrap/Accordion";
import "./home.css";

interface UserInfo {
  vacation: string;
  sick: string;
  fMal: string;
  optionalHoliday: string;
  other: string;
}

interface UserInfoUpdated {
  vacationUpdated: string;
  dateVacationUsed: string;
  vacationDescription: string;
  sickUpdated: string;
  dateSickUpdated: string;
  sickDescription: string;
  fMalUpdated: string;
  dateFmalUpdated: string;
  fMalDescription: string;
  optionalHolidayUpdated: string;
  dateOptionalHolidayUpdated: string;
  optionalHolidayDescription: string;
  otherUpdated: string;
  dateOtherUpdated: string;
  otherDescription: string;
}

const Home: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    vacation: "",
    sick: "",
    optionalHoliday: "",
    fMal: "",
    other: "",
  });
  const [userInfoUpdated, setUserInfoUpdated] = useState<UserInfoUpdated>({
    vacationUpdated: "",
    dateVacationUsed: "",
    vacationDescription: "",
    sickUpdated: "",
    dateSickUpdated: "",
    sickDescription: "",
    fMalUpdated: "",
    dateFmalUpdated: "",
    fMalDescription: "",
    optionalHolidayUpdated: "",
    dateOptionalHolidayUpdated: "",
    optionalHolidayDescription: "",
    otherUpdated: "",
    dateOtherUpdated: "",
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
    setState: React.Dispatch<React.SetStateAction<any>>
  ) => {
    const { name, value } = event.target;
    setState((prevState: any) => ({
      ...prevState,
      [name]:
        name.includes("Updated") && !name.includes("date")
          ? Number(value)
          : value,
    }));
  };

  const handleAddVacationInfo = () => {
    if (
      !userInfo.vacation ||
      !userInfoUpdated.vacationUpdated ||
      !userInfoUpdated.dateVacationUsed
    ) {
      alert("Not added. Missing Information.");
      return;
    }
    setAddVacationInfo((prevInfo) => [...prevInfo, userInfoUpdated]);
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      vacation: (
        Number(prevInfo.vacation) - Number(userInfoUpdated.vacationUpdated)
      ).toString(),
    }));
    setUserInfoUpdated({
      vacationUpdated: "",
      dateVacationUsed: "",
      vacationDescription: "",
      sickUpdated: "",
      dateSickUpdated: "",
      sickDescription: "",
      fMalUpdated: "",
      dateFmalUpdated: "",
      fMalDescription: "",
      optionalHolidayUpdated: "",
      dateOptionalHolidayUpdated: "",
      optionalHolidayDescription: "",
      otherUpdated: "",
      dateOtherUpdated: "",
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
    setAddSickInfo((prevInfo) => [...prevInfo, userInfoUpdated]);
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      sick: (
        Number(prevInfo.sick) - Number(userInfoUpdated.sickUpdated)
      ).toString(),
    }));
    setUserInfoUpdated({
      vacationUpdated: "",
      dateVacationUsed: "",
      vacationDescription: "",
      sickUpdated: "",
      dateSickUpdated: "",
      sickDescription: "",
      fMalUpdated: "",
      dateFmalUpdated: "",
      fMalDescription: "",
      optionalHolidayUpdated: "",
      dateOptionalHolidayUpdated: "",
      optionalHolidayDescription: "",
      otherUpdated: "",
      dateOtherUpdated: "",
      otherDescription: "",
    });
  };

  const handleAddFmalInfo = () => {
    if (
      !userInfo.fMal ||
      !userInfoUpdated.fMalUpdated ||
      !userInfoUpdated.dateFmalUpdated ||
      !userInfoUpdated.fMalDescription
    ) {
      alert("Not added. Missing Information.");
      return;
    }
    setAddFmalInfo((prevInfo) => [...prevInfo, userInfoUpdated]);
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      fMal: (
        Number(prevInfo.fMal) - Number(userInfoUpdated.fMalUpdated)
      ).toString(),
    }));
    setUserInfoUpdated({
      vacationUpdated: "",
      dateVacationUsed: "",
      vacationDescription: "",
      sickUpdated: "",
      dateSickUpdated: "",
      sickDescription: "",
      fMalUpdated: "",
      dateFmalUpdated: "",
      fMalDescription: "",
      optionalHolidayUpdated: "",
      dateOptionalHolidayUpdated: "",
      optionalHolidayDescription: "",
      otherUpdated: "",
      dateOtherUpdated: "",
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
    setAddOptionalHolidayInfo((prevInfo) => [...prevInfo, userInfoUpdated]);
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      optionalHoliday: (
        Number(prevInfo.optionalHoliday) -
        Number(userInfoUpdated.optionalHolidayUpdated)
      ).toString(),
    }));
    setUserInfoUpdated({
      vacationUpdated: "",
      dateVacationUsed: "",
      vacationDescription: "",
      sickUpdated: "",
      dateSickUpdated: "",
      sickDescription: "",
      fMalUpdated: "",
      dateFmalUpdated: "",
      fMalDescription: "",
      optionalHolidayUpdated: "",
      dateOptionalHolidayUpdated: "",
      optionalHolidayDescription: "",
      otherUpdated: "",
      dateOtherUpdated: "",
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
    setAddOtherInfo((prevInfo) => [...prevInfo, userInfoUpdated]);
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      other: (
        Number(prevInfo.other) - Number(userInfoUpdated.otherUpdated)
      ).toString(),
    }));
    setUserInfoUpdated({
      vacationUpdated: "",
      dateVacationUsed: "",
      vacationDescription: "",
      sickUpdated: "",
      dateSickUpdated: "",
      sickDescription: "",
      fMalUpdated: "",
      dateFmalUpdated: "",
      fMalDescription: "",
      optionalHolidayUpdated: "",
      dateOptionalHolidayUpdated: "",
      optionalHolidayDescription: "",
      otherUpdated: "",
      dateOtherUpdated: "",
      otherDescription: "",
    });
  };

  const handleDeleteVacationInfo = (index: number) => {
    const infoToDelete = addVacationInfo[index];
    setAddVacationInfo((prevInfo) => prevInfo.filter((_, i) => i !== index));
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      vacation: (
        Number(prevInfo.vacation) + Number(infoToDelete.vacationUpdated)
      ).toString(),
    }));
  };

  const handleDeleteSickInfo = (index: number) => {
    const infoToDelete = addSickInfo[index];
    setAddSickInfo((prevInfo) => prevInfo.filter((_, i) => i !== index));
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      sick: (
        Number(prevInfo.sick) + Number(infoToDelete.sickUpdated)
      ).toString(),
    }));
  };

  const handleDeleteFmalInfo = (index: number) => {
    const infoToDelete = addFmalInfo[index];
    setAddFmalInfo((prevInfo) => prevInfo.filter((_, i) => i !== index));
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      fMal: (
        Number(prevInfo.fMal) + Number(infoToDelete.fMalUpdated)
      ).toString(),
    }));
  };

  const handleDeleteOptionalHolidayInfo = (index: number) => {
    const infoToDelete = addOptionalHolidayInfo[index];
    setAddOptionalHolidayInfo((prevInfo) =>
      prevInfo.filter((_, i) => i !== index)
    );
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      optionalHoliday: (
        Number(prevInfo.optionalHoliday) +
        Number(infoToDelete.optionalHolidayUpdated)
      ).toString(),
    }));
  };

  const handleDeleteOtherInfo = (index: number) => {
    const infoToDelete = addOtherInfo[index];
    setAddOtherInfo((prevInfo) => prevInfo.filter((_, i) => i !== index));
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      other: (
        Number(prevInfo.other) + Number(infoToDelete.otherUpdated)
      ).toString(),
    }));
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
          <Accordion.Header>FMAL</Accordion.Header>
          <Accordion.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text>FMAL Hours</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="FMAL"
                onChange={(e) => handleChange(e, setUserInfo)}
                value={userInfo.fMal}
                name="fMal"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>FMAL Hours Used</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="FMAL Hours Used"
                onChange={(e) => handleChange(e, setUserInfoUpdated)}
                value={userInfoUpdated.fMalUpdated}
                name="fMalUpdated"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Date FMAL Used</InputGroup.Text>
              <Form.Control
                type="date"
                placeholder="Date FMAL Used"
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
                value={userInfoUpdated.fMalDescription}
                name="fMalDescription"
              />
            </InputGroup>
            <button className="btn-add" onClick={handleAddFmalInfo}>
              Add FMAL Time
            </button>
            <div>
              {addFmalInfo.map((info, index) => (
                <div key={index} className="info-item">
                  <p>FMAL Hours Used: {info.fMalUpdated}</p>
                  <p>Date FMAL Used: {info.dateFmalUpdated}</p>
                  <p>Description: {info.fMalDescription}</p>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteFmalInfo(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
              <div>
                <p>Hours Remaining: {userInfo.fMal}</p>
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
    </div>
  );
};

export default Home;
