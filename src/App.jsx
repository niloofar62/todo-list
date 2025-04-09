import './App.css'
// eslint-disable-next-line no-unused-vars
import TodoList from './TodoList'
// eslint-disable-next-line no-unused-vars
import TodoForm from './TodoForm'
import { useState } from 'react'

function App() {
  const [todoList, setTodoList] = useState([]);

  function handleAddTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todoList={todoList} /> {/* ← passed todoList as a prop */}
    </div>
  );
}

export default App;
