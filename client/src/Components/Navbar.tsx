import { Link } from "react-router-dom";
import './assets/style.css'
import React from "react";

export default function Navbar() {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='calendar'>Calendar</Link>
    </nav>
  )
}