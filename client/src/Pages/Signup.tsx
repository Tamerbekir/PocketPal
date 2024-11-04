import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <form className="formLogin">
        <p>Username</p>
        <input
          className="usernameInput"
          name="username"
          placeholder="Your username..."
        ></input>
        <p>Password</p>
        <input
          className="passwordInput"
          name="password"
          type="password"
          placeholder="Your password..."
        ></input>
        <p>Confirm Password</p>
        <input
          className="passwordInput"
          name="password"
          type="password"
          placeholder="Confirm password..."
        ></input>
        <br />
        <button className="signUpFormBtn" type="button">
          Sign Up
        </button>
      </form>
      <div className="signUpDiv">
        <p className="signIpText">Already have an account, login here!</p>
        <button onClick={navigateLogin} className="signUpBtn">
          Log In
        </button>
      </div>
    </div>
  );
}
