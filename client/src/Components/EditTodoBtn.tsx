import React from "react";

interface EditTodoBtnProp {
  index: number;
  handleEditTodo: (index: number) => void;
}

export default function EditTodoBtn({
  index,
  handleEditTodo,
}: EditTodoBtnProp) {
  return (
    <button className="editBtn" onClick={() => handleEditTodo(index)}>
      Edit
    </button>
  );
}
