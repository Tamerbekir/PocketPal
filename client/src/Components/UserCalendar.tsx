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
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: -150, bottom: 400 }}
        whileDrag={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 5, damping: 10 }}
        style={{
          width: "100%",
          position: "absolute",
          top: 150,
          zIndex: 1,
        }}
      >
        {openCalender && <Calendar onChange={onChange} value={value} />}
        <h1 onClick={handleCalendarOpen} className="openCalenderHeader">
          {openCalender ? "Close" : "Calendar"}
        </h1>
      </motion.div>
    </div>
  );
}
