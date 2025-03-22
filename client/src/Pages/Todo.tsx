import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import "../assets/todo.css";

import DeleteTodoBtn from "../Components/DeleteTodoBtn";
import EditTodoBtn from "../Components/EditTodoBtn";
import CompleteTodoBtn from "../Components/CompleteTodoBtn";

export default function Todo() {
  interface Todo {
    item: string;
    date: string;
    notes: string;
  }

  const [todo, setTodo] = useState({
    item: "",
    date: "",
    notes: "",
  });

  const [submitTodo, setSubmitTodo] = useState<Todo[]>(() => {
    const savedData = localStorage.getItem("submitTodo");
    return savedData ? JSON.parse(savedData) : [];
  });

  const [completedTodos, setCompletedTodos] = useState<Todo[]>(() => {
    const savedDate = localStorage.getItem("completedTodos");
    return savedDate ? JSON.parse(savedDate) : [];
  });
  const [successMessage, setSuccessMessage] = useState<boolean | null>(null);
  const [addTask, setAddTask] = useState<boolean>(false);
  const [completeList, setCompleteList] = useState<boolean | null>(null);
  const [openTodo, setOpenTodo] = useState<number | null>(null);

  const handleTodoChange = (event) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  const handleSubmitTodo = () => {
    setSubmitTodo([...submitTodo, todo]);
    setTodo({ item: "", date: "", notes: "" });
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000);
  };

  const handleCompleteTodo = (index: number) => {
    const allTodos = [...submitTodo];
    const completeTodo = allTodos.splice(index, 1)[0];
    if (completeTodo) {
      setCompletedTodos([...completedTodos, completeTodo]);
      setSubmitTodo(allTodos);
    }
    // console.log(completeTodo);
  };

  const handleUndoCompleteTodo = (index: number) => {
    const allCompletedTodos = [...completedTodos];
    const completedTodo = allCompletedTodos.splice(index, 1)[0];
    if (completedTodo) {
      setSubmitTodo([...submitTodo, completedTodo]);
      setCompletedTodos(allCompletedTodos);
    }
    // console.log(completedTodo);
  };

  const handleClearTodo = (index: number) => {
    const allCompletedTodos = [...completedTodos];
    allCompletedTodos.splice(index, 1);
    setCompletedTodos(allCompletedTodos);
  };

  const handleShowCompleteList = () => {
    setCompleteList(!completeList);
  };

  const handleDeleteTodo = (index: number) => {
    const updateTodo = [...submitTodo];
    updateTodo.splice(index, 1);
    setSubmitTodo(updateTodo);
    console.log(updateTodo);
  };

  // Begin edit
  // create useState
  // spread submittodo
  // update state

  useEffect(() => {
    localStorage.setItem("submitTodo", JSON.stringify(submitTodo));
  }, [submitTodo]);

  useEffect(() => {
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  }, [completedTodos]);

  return (
    <div className="containerTodo">
      <div>
        <div className="remainingTasksDiv">
          <p className="remainingTasksText">
            {submitTodo.length > 0 && (
              <p>{submitTodo.length} remaining tasks</p>
            )}
          </p>
        </div>

        {addTask && (
          <div className="todoForm">
            <InputGroup className="mb-3">
              <FloatingLabel controlId="floatingTextarea2" label="Add an item">
                <Form.Control
                  placeholder="To do"
                  type="text"
                  name="item"
                  value={todo.item}
                  onChange={handleTodoChange}
                  className="todoItem"
                  aria-describedby="basic-addon1"
                />
              </FloatingLabel>
            </InputGroup>
            <FloatingLabel controlId="floatingTextarea2" label="Note">
              <Form.Control
                as="textarea"
                name="notes"
                value={todo.notes}
                onChange={handleTodoChange}
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
              />
            </FloatingLabel>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="To do"
                type="date"
                name="date"
                value={todo.date}
                onChange={handleTodoChange}
                className="todoDate"
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            {todo.item && (
              <button
                className="addBtn"
                onClick={() => {
                  handleSubmitTodo();
                  setAddTask(!addTask);
                }}
              >
                Add
              </button>
            )}
            <button className="cancelBtn" onClick={() => setAddTask(!addTask)}>
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className="listDiv">
        <h4 className="nothingToDoText">
          {submitTodo.length < 1 && <p>No tasks</p>}
        </h4>

        {submitTodo.map((addedItem, index) => (
          <div
            key={index}
            onClick={() => setOpenTodo(openTodo === index ? null : index)}
          >
            {openTodo !== index && (
              <ul>
                <li className="nonActiveTodo">{addedItem.item}</li>
              </ul>
            )}
            {openTodo === index && (
              <div>
                <p className="activeTodo">{addedItem.item}</p>
                {addedItem.date && (
                  <p className="todoText">Complete by: {addedItem.date}</p>
                )}
                {addedItem.notes && (
                  <p className="todoText">{addedItem.notes}</p>
                )}
                <div className="deleteBtnDiv">
                  <DeleteTodoBtn
                    index={index}
                    handleDeleteTodo={handleDeleteTodo}
                  />
                  <CompleteTodoBtn
                    index={index}
                    handleCompleteTodo={handleCompleteTodo}
                  />
                  {/* <EditTodoBtn
                    index={index}
                    handleEditTodo={handleDeleteTodo}
                  /> */}
                </div>
              </div>
            )}
          </div>
        ))}

        {completedTodos.length > 0 ? (
          <div>
            <p>Completed: {completedTodos.length}</p>
            <button
              className="completedListBtn"
              onClick={() => handleShowCompleteList()}
            >
              {completeList || null ? "Close" : "Show Completed"}
            </button>
          </div>
        ) : (
          ""
        )}
        {completeList && (
          <div>
            {completedTodos.map((completedItems, index) => (
              <div key={index}>
                <p style={{ color: "green" }}>{completedItems.item}</p>
                <button onClick={() => handleClearTodo(index)}>Clear</button>
                <button onClick={() => handleUndoCompleteTodo(index)}>
                  Undo
                </button>
              </div>
            ))}
          </div>
        )}
        <button className="startTaskBtn" onClick={() => setAddTask(!addTask)}>
          {addTask ? "Computing.." : "Start Task"}
        </button>
      </div>
    </div>
  );
}
