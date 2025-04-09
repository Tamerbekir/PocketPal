import { Route, Routes } from "react-router-dom";
import Activities from "./Pages/Activities";
import UserCalendar from "./Components/UserCalendar";
import Settings from "./Pages/Settings";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import Todo from "./Pages/Todo";
import Journal from "./Pages/Journal";
import Desktop from "./Pages/Desktop";
import React from "react";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Desktop />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="settings" element={<Settings />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="todo" element={<Todo />} />
      <Route path="journal" element={<Journal />} />
      <Route path="userCalendar" element={<UserCalendar />} />
    </Routes>
  );
}

export default App;
