import React, { useState } from "react";
import "../assets/todo.css";

interface DeleteTodoBtnProp {
  index: number;
  handleDeleteTodo: (index: number) => void;
}

export default function DeleteTodoBtn({
  index,
  handleDeleteTodo,
}: DeleteTodoBtnProp) {
  return (
    <button className="deleteBtn" onClick={() => handleDeleteTodo(index)}>
      Delete
    </button>
  );
}
