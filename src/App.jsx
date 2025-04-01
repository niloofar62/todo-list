
import './App.css'
// eslint-disable-next-line no-unused-vars
import TodoList from './TodoList'
// eslint-disable-next-line no-unused-vars
import TodoForm from './TodoForm'
import { useState } from 'react'


function App() {
  const [newTodo, setNewTodo] = useState("Example Text ");
 
  

  return (
    <div>
        <h1>Todo List</h1>
        <TodoForm/>
        <p>{newTodo}</p>
        <TodoList/>
        
       
    </div>
   
  )
}

export default App
