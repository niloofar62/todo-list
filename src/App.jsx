
import './App.css'
// eslint-disable-next-line no-unused-vars
import TodoList from './features/TodoList/TodoList'
// eslint-disable-next-line no-unused-vars
import TodoForm from './features/TodoForm'
import { useState } from 'react'


function App() {
  // Define the todo list
  const [todoList, setTodoList] = useState([]);

  // Function to add a new todo
  function handleAddTodo(newTitle) {
    const newTodo = {
      id: Date.now(),
      title: newTitle,
      isCompleted: false, 
    };
    setTodoList([...todoList, newTodo]);
  }

  function completeTodo(id) {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      }
      return todo;
    });
  
    setTodoList(updatedTodos);
  }
  
  

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} />
    </div>
  );
}

export default App;
