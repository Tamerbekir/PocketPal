import React, { useState } from "react";
import { Link } from "react-router-dom";
import todoImg from "../assets/images/todoListIcon.webp";
import activitiesIcon from "../assets/images/activitiesIcon.webp";
import journalIcon from "../assets/images/journalIcon.webp";
import settingsIcon from "../assets/images/settingsIcon.webp";
import { motion } from "framer-motion";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseIcon from "@mui/icons-material/Close";

import Todo from "./Todo";
import Activities from "./Activities";
import Journal from "./Journal";
import "../assets/desktop.css";

export default function Home() {
  const [openTodoWindow, setOpenTodoWindow] = useState<boolean>(false);
  const [openActivitiesWindow, setOpenActivitiesWindow] =
    useState<boolean>(false);
  const [openJournalWindow, setOpenJournalWindow] = useState<boolean>(false);

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
        <Link>
          <img
            src={todoImg}
            alt=""
            className="todoListIcon"
            onClick={() => setOpenTodoWindow(!openTodoWindow)}
          />
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
        <Link>
          <img
            src={activitiesIcon}
            alt=""
            className="todoListIcon"
            onClick={() => setOpenActivitiesWindow(!openActivitiesWindow)}
          />
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
        <Link>
          <img
            src={journalIcon}
            alt=""
            className="todoListIcon"
            onClick={() => setOpenJournalWindow(!openJournalWindow)}
          />
        </Link>
      </motion.div>
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 90, top: -100, bottom: 350 }}
        whileDrag={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 10, damping: 10 }}
        style={{
          width: "80%",
          position: "absolute",
          // top: 300,
          // left: 300,
          zIndex: 1,
        }}
      >
        {openTodoWindow && (
          <>
            <>
              <Todo />
            </>
            <button
              className="viewFullScreenActivitiesBtn"
              onClick={() => (window.location.href = "/todo")}
            >
              <OpenInFullIcon />
              {/* <FontAwesomeIcon icon={faExpand} /> */}
            </button>
            <button
              className="closeActivitiesScreenBtn"
              onClick={() => setOpenTodoWindow(!openTodoWindow)}
            >
              <CloseIcon />
            </button>
          </>
        )}
      </motion.div>

      <motion.div
        drag
        dragConstraints={{ left: 0, right: 90, top: -100, bottom: 350 }}
        whileDrag={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 10, damping: 10 }}
        style={{
          width: "80%",
          position: "absolute",
          // backgroundColor: "back",
          zIndex: 1,
        }}
      >
        {openActivitiesWindow && (
          <>
            <Activities />
            <>
              <button
                className="viewFullScreenActivitiesBtn"
                onClick={() => (window.location.href = "/activities")}
              >
                <OpenInFullIcon />
              </button>
              <button
                className="closeActivitiesScreenBtn"
                onClick={() => setOpenActivitiesWindow(!openActivitiesWindow)}
              >
                <CloseIcon />
              </button>
            </>
          </>
        )}
      </motion.div>
      {/* <motion.div
        drag
        dragConstraints={{ left: -200, right: 30, top: -150, bottom: 400 }}
        whileDrag={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 10, damping: 10 }}
        style={{
          // width: "100%",
          position: "absolute",
          // top: 300,
          // left: 300,
          zIndex: 1,
        }}
      >
        {openJournalWindow && <Journal />}
      </motion.div> */}
    </div>
  );
}
