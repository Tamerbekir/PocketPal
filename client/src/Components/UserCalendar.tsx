import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../assets/calendar.css";
import { motion } from "framer-motion";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props {
  theme: "light" | "dark";
}

export default function UserCalendar({ isVisible }) {
  const [openCalender, setOpenCalendar] = useState<boolean>();
  const [value, onChange] = useState<Value>(new Date());

  const handleCalendarOpen = () => {
    setOpenCalendar(!openCalender);
  };

  return (
    <div className="calendarDiv">
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}
