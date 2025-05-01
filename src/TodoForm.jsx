import { useState } from "react";

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  function handleAddTodo(event) {
    event.preventDefault();

    const title = workingTodoTitle.trim();

    if (title !== "") {
      onAddTodo(title);          // send to parent
      setWorkingTodoTitle("");   // clear input
    }
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      <input
        type="text"
        id="todoTitle"
        name="title"
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
      />
      <button type="submit" disabled={workingTodoTitle.trim() === ""}>
  Add Todo
</button>

    </form>
  );
}

export default TodoForm;
