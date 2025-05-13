
import TextInputWithLabel from "../shared/TextInputWithLabel";

import { useState, useRef } from "react";


function TodoForm({ onAddTodo, isSaving }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");
  const inputRef = useRef();

  function handleAddTodo(event) {
    event.preventDefault();
    const title = workingTodoTitle.trim();

    if (title !== "") {
      onAddTodo(title);
      setWorkingTodoTitle("");
    }
  }

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        label="Todo"
        inputRef={inputRef}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
      />
      <button type="submit" disabled={workingTodoTitle.trim() === "" || isSaving}>
  {isSaving ? "Saving..." : "Add Todo"}
</button>

    </form>
  );
}

export default TodoForm;
