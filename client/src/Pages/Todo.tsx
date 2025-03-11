import React, { useState, useEffect } from "react";

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

  const [submitTodo, setSubmitTodo] = useState<Todo[]>([]);

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

  return (
    <div>
      <h1>Todo</h1>
      <input
        placeholder="add a todo.."
        type="text"
        name="item"
        value={todo.item}
        onChange={handleTodoChange}
      />
      <button onClick={handleSubmitTodo}>Add</button>
      <h4>List</h4>
      <div>
        {submitTodo.map((addedItem, index) => (
          <div key={index}>
            <p>{addedItem.item}</p>
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
