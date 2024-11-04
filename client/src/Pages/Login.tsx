import { useState } from "react";
import "../assets/login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // TODO: BRING IN MUTATIONS AND QUERIES

  const [userLoginInfo, setUserLoginInfo] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    emptyField: "",
  });

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setUserLoginInfo({
      ...userLoginInfo,
      [name]: value,
    });
    setError({
      emptyFields: "",
    });
  };

  const handleLoginForm = async () => {
    if (userLoginInfo.username === "" || userLoginInfo.password === "") {
      setError({
        emptyField: "Fields cannot be left empty",
      });
      //! BOILERPLATE TEMPLATE FOR MUTATION. ADD YOUR OWN MUTATION HERE
      try {
        await userLoginInfo({
          variables: {
            username: userLoginInfo.username,
            password: userLoginInfo.password,
          },
        });
      } catch (error) {
        console.log("there was an error", error);
      }
    }
  };

  const navigate = useNavigate();
  const navigateSignUp = () => {
    navigate("/signup");
  };

  return (
    <div>
      <form className="formLogin">
        <p>Username</p>
        <input
          className="usernameInput"
          name="username"
          placeholder="Your username..."
          value={userLoginInfo.username}
          onChange={handleLoginChange}
        ></input>
        <p>Password</p>
        <input
          className="passwordInput"
          name="password"
          type="password"
          placeholder="Your password..."
          value={userLoginInfo.password}
          onChange={handleLoginChange}
        ></input>
        <br />
        <p className="errorField">{error.emptyField}</p>
        <button
          className="loginFormBtn"
          type="button"
          onClick={handleLoginForm}
        >
          Login
        </button>
      </form>
      <div className="signupDiv">
        <p className="signupText">
          If you don't already have an account, signup here!
        </p>
        <button onClick={navigateSignUp} className="signupBtn">
          Sign-up
        </button>
      </div>
    </div>
  );
}
