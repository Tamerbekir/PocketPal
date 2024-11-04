import { useState } from "react";
import "../assets/settings.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Settings() {
  const [changePassWord, setChangePassword] = useState(false);
  const [changeName, setChangeName] = useState(false);

  return (
    <div>
      {!changeName ? (
        <>
          <Form.Label htmlFor="inputName">Username</Form.Label>
          <Form.Control type="text" id="inputName" />
          <Button
            onClick={() => setChangeName(true)}
            style={{ backgroundColor: "grey", border: "none" }}
          >
            Change Username
          </Button>
        </>
      ) : (
        <>
          <Form.Label htmlFor="inputName">New Username</Form.Label>
          <Form.Control type="text" id="inputNameChange" />
          <br />
          <>
            <Button
              onClick={() => setChangeName(false)}
              style={{ backgroundColor: "grey", border: "none" }}
            >
              Save
            </Button>
          </>
        </>
      )}
      {!changePassWord ? (
        <>
          <>
            <br />
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="currentPassword"
              aria-describedby="passwordHelpBlock"
            />
          </>
          <Button
            onClick={() => setChangePassword(true)}
            style={{ backgroundColor: "grey", border: "none" }}
          >
            Change Password
          </Button>
        </>
      ) : (
        <>
          <br />
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            id="newPassword"
            aria-describedby="passwordHelpBlock"
          />
          <Form.Label> Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            id="confirmNewPassword"
            aria-describedby="passwordHelpBlock"
          />
          <Button
            onClick={() => setChangePassword(false)}
            style={{ backgroundColor: "grey", border: "none" }}
          >
            Save
          </Button>
        </>
      )}
    </div>
  );
}
