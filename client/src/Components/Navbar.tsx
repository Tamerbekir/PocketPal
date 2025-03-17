import { Link } from "react-router-dom";
import "./assets/navbar.css";
import { useState, useEffect } from "react";

export default function Navbar() {
  //Set the theme useState to be either light or dark but set the page to load as as dark for useState
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // use effect that takes in the body of the document and makes the className 'theme'
  useEffect(() => {
    document.body.className = theme;
    console.log(document.body.className);
  }, [theme]);

  //!a longer way of writing function will delete if all works
  // const handleTheme = () => {
  //   if (theme === 'light') {
  //     setTheme('dark')
  //   } else {
  //     setTheme('light')
  //   }
  // }

  //A toggle that sets useState to apply the one or the other (light or dark)
  // 'light' or 'dark' are used in the css for the body change
  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="navDiv">
      <Link to="/">Activities</Link>
      {/* <Link to="calendar">Calendar</Link> */}
      <Link to="todo">To Do</Link>
      <Link to="settings">Settings</Link>
      {/* <Link to="journal">Journal</Link> */}
      {/* <Link to="login">Login</Link> */}
      {/* taking the className theme we defined and using it here
      creating onClick to activate the toggle for theme
      Using a cursor so it presents itself as clickable for the user */}
      {/* <a className="theme" onClick={handleTheme} style={{ cursor: "pointer" }}> */}
      {/* If the theme is light, make it dark, otherwise keep it as light. 'Light' and "Dark" are visually shown on page */}
      {/* {theme === "light" ? "Dark" : "Light"} */}
      {/* </a> */}
    </nav>
  );
}
