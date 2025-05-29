
import TextInputWithLabel from "../shared/TextInputWithLabel";

import { useState, useRef } from "react";
import styled from 'styled-components';

const StyledForm = styled.form`
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
`;

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  margin-top: 0.5rem;
  border-radius: 4px;
  font-style: ${(props) => (props.disabled ? "italic" : "normal")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${(props) => (props.disabled ? "#4caf50" : "#45a049")};
  }
`;



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
    // <form onSubmit={handleAddTodo}>
    <StyledForm onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        label="Todo"
        inputRef={inputRef}
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
      />
      {/* <button type="submit" disabled={workingTodoTitle.trim() === "" || isSaving}>
  {isSaving ? "Saving..." : "Add Todo"}
</button> */}
<StyledButton
        type="submit"
        disabled={workingTodoTitle.trim() === "" || isSaving}
      >
        {isSaving ? "Saving..." : "Add Todo"}
      </StyledButton>

    {/* // </form> */}
    </StyledForm>
  );
}

export default TodoForm;
