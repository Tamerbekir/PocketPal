import ReactDOM from "react-dom/client";
import React, { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Navbar />
    <App />
  </BrowserRouter>
);
