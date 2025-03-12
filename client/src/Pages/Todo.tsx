import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import "../assets/todo.css";

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

  const [completeTodo, setCompleteTodo] = useState(null);

  const handleTodoChange = (event) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  const handleSubmitTodo = () => {
    setSubmitTodo([...submitTodo, todo]);
  };

  const handleDeleteTodo = (index: number) => {
    const updateTodo = [...submitTodo];
    updateTodo.splice(index, 1)[0];
    setSubmitTodo(updateTodo);
    console.log(updateTodo);
  };

  useEffect(() => {
    localStorage.setItem("submitTodo", JSON.stringify(submitTodo));
  }, [submitTodo]);

  return (
    <div>
      <div className="container">
        <h1>Todo</h1>
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
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={todo.date}
            label="Date"
            name="date"
            className="todoDate"
            onChange={() => handleDateChange}
            slotProps={{
              textField: {
                helperText: "MM/DD/YYYY",
              },
            }}
          />
        </LocalizationProvider> */}
        <button onClick={handleSubmitTodo}>Add</button>
      </div>
      <h4>List</h4>
      <div className="listDiv">
        {submitTodo.map((addedItem, index) => (
          <div key={index}>
            {/* <p>{addedItem.date}</p> */}
            <p>{addedItem.item}</p>
            <p>{addedItem.notes}</p>
            <button
              className="deleteBtn"
              onClick={() => handleDeleteTodo(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
