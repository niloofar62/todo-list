
import { useRef } from "react";
function TodoForm({ onAddTodo }) {
    const todoTitleInput=useRef("");
    
    function handleAddTodo(event) {
      event.preventDefault(); // Prevent page reload
      
  
      const title = event.target.title.value; // Get the input value
  
      onAddTodo(title); // Call the function passed from parent with the input value
  
      event.target.title.value = ""; // Clear the input after submission
      todoTitleInput.current.focus();
    }
  
    return (
      <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Todo</label>
        <input type="text" id="todoTitle" name="title" ref={todoTitleInput} />
        <button type="submit">Add Todo</button>
      </form>
    );
  }
  
  export default TodoForm;
  