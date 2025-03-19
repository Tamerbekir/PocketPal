import React from "react";
import { Link } from "react-router-dom";
import todoImg from "../assets/images/todoListIcon.webp";
import activitiesIcon from "../assets/images/activitiesIcon.webp";
import journalIcon from "../assets/images/journalIcon.webp";
import settingsIcon from "../assets/images/settingsIcon.webp";
import { motion } from "framer-motion";
import "../assets/desktop.css";

export default function Home() {
  return (
    <div>
      <h1 className="header">Pocket Pal</h1>
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 330, top: -150, bottom: 400 }}
        whileDrag={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 5, damping: 10 }}
        style={{
          // width: "100%",
          position: "absolute",
          top: 300,
          zIndex: 1,
        }}
      >
        <Link to="/todo">
          <img src={todoImg} alt="" className="todoListIcon" />
        </Link>
      </motion.div>
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 230, top: -150, bottom: 400 }}
        whileDrag={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 5, damping: 10 }}
        style={{
          // width: "100%",
          position: "absolute",
          left: 100,
          top: 300,
          zIndex: 1,
        }}
      >
        <Link to="/activities">
          <img src={activitiesIcon} alt="" className="todoListIcon" />
        </Link>
      </motion.div>
      <motion.div
        drag
        dragConstraints={{ left: -200, right: 130, top: -150, bottom: 400 }}
        whileDrag={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 5, damping: 10 }}
        style={{
          // width: "100%",
          position: "absolute",
          left: 200,
          top: 300,
          zIndex: 1,
        }}
      >
        <Link to="/settings">
          <img src={settingsIcon} alt="" className="todoListIcon" />
        </Link>
      </motion.div>
      <motion.div
        drag
        dragConstraints={{ left: -300, right: 30, top: -150, bottom: 400 }}
        whileDrag={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 10, damping: 10 }}
        style={{
          // width: "100%",
          position: "absolute",
          top: 300,
          left: 300,
          zIndex: 1,
        }}
      >
        <Link to="/journal">
          <img src={journalIcon} alt="" className="todoListIcon" />
        </Link>
      </motion.div>
    </div>
  );
}
