import React from "react";

interface CompleteTodoBtnProp {
  index: number;
  handleCompleteTodo: (index: number) => void;
}

export default function CompleteTodoBtn({
  index,
  handleCompleteTodo,
}: CompleteTodoBtnProp) {
  return (
    <button className="completeBtn" onClick={() => handleCompleteTodo(index)}>
      Complete
    </button>
  );
}
