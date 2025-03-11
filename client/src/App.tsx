import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import UserCalendar from "./Components/UserCalendar";
import Settings from "./Pages/Settings";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import Todo from "./Pages/Todo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="settings" element={<Settings />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="todo" element={<Todo />} />
    </Routes>
  );
}

export default App;
