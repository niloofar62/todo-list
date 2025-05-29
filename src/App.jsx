
import './App.css'
// eslint-disable-next-line no-unused-vars
import TodoList from './features/TodoList/TodoList'
import TodosViewForm from './features/TodosViewForm'
// eslint-disable-next-line no-unused-vars
import TodoForm from './features/TodoForm'
import { useState,useEffect } from 'react'
import styles from './App.module.css';
import { useCallback } from 'react'



// const encodeUrl = ({ sortField, sortDirection, queryString }) => {
//   const baseUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
//   const sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;

//   let searchQuery = '';
//   if (queryString) {
//     searchQuery = `&filterByFormula=SEARCH("${queryString}", title)`;
//   }

//   return encodeURI(`${baseUrl}?${sortQuery}${searchQuery}`);
// };

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [sortField, setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");
  const [queryString, setQueryString] = useState('');


  const encodeUrl = useCallback(()=>{
    const baseUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;

  let searchQuery = '';
  if (queryString) {
    searchQuery = `&filterByFormula=SEARCH("${queryString}", title)`;
  }

  return encodeURI(`${baseUrl}?${sortQuery}${searchQuery}`);

  },[sortField, sortDirection, queryString])


  // const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;
  

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);

      const options = {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      };

      try {
        const resp = await fetch(encodeUrl(), options);
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }

        const data = await resp.json();
        const fetchedTodos = data.records.map((record) => {
          const todo = {
            id: record.id,
            ...record.fields,
          };
          if (!todo.isCompleted) {
            todo.isCompleted = false;
          }
          return todo;
        });

        setTodoList(fetchedTodos);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [sortField,sortDirection,queryString]);

  // function handleAddTodo(newTitle) {
  //   const newTodo = {
  //     id: Date.now(),
  //     title: newTitle,
  //     isCompleted: false,
  //   };
  //   setTodoList([...todoList, newTodo]);
  // }
  async function handleAddTodo(newTitle) {
    const newTodo = {
      title: newTitle,
      isCompleted: false,
    };
  
    const payload = {
      records: [
        {
          fields: newTodo,
        },
      ],
    };
  
    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
  
    try {
      setIsSaving(true);
  
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) throw new Error('Failed to save todo');
  
      const { records } = await resp.json();
  
      const savedTodo = {
        id: records[0].id,
        ...records[0].fields,
      };
  
      if (!savedTodo.isCompleted) {
        savedTodo.isCompleted = false;
      }
  
      setTodoList([...todoList, savedTodo]);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  }
  

  // function completeTodo(id) {
  //   const updatedTodos = todoList.map((todo) =>
  //     todo.id === id ? { ...todo, isCompleted: true } : todo
  //   );
  //   setTodoList(updatedTodos);
  // }
  async function completeTodo(id) {
    // 1 Keep a copy of the original list
    const originalTodos = [...todoList];
  
    //  2 Optimistically update the UI
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  
    // 3️ Build the Airtable payload & options
    const payload = {
      records: [
        {
          id,
          fields: { isCompleted: true },
        },
      ],
    };
    const options = {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
  
    // 4️ Send the request and handle errors
    try {
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error("Failed to complete todo");
      }
      // (Optionally i could re-sync with the response payload here)
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
      // 5️ Roll back to the original list
      setTodoList(originalTodos);
    }
  }

  // function updateTodo(editedTodo) {
  //   const updatedTodos = todoList.map((todo) =>
  //     todo.id === editedTodo.id ? { ...todo, title: editedTodo.title } : todo
  //   );
  //   setTodoList(updatedTodos);
  // }
  async function updateTodo(editedTodo) {
    setIsSaving(true);
  
    // Save the original todo
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
  
    // Update UI immediately (optimistic update)
    const updatedTodos = todoList.map((todo) =>
      todo.id === editedTodo.id ? { ...todo, title: editedTodo.title } : todo
    );
    setTodoList(updatedTodos);
  
    // Prepare payload for Airtable
    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };
  
    const options = {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
  
    try {
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error("Failed to update todo");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(`${error.message}. Reverting todo...`);
  
      // Revert UI to original state
      const revertedTodos = todoList.map((todo) =>
        todo.id === originalTodo.id ? originalTodo : todo
      );
      setTodoList(revertedTodos);
    } finally {
      setIsSaving(false);
    }
  }
  

  return (
    <div className={styles.container}>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={handleAddTodo} isSaving={isSaving}/>
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={isLoading}
      />
      <hr />
      <TodosViewForm
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        queryString={queryString}
        setQueryString={setQueryString}
      />



      {errorMessage && (
        <div className={styles.errorMessage}>
          <hr />
          <p>{errorMessage}</p>
          {/* <button type="submit" disabled={workingTodoTitle.trim() === ''}>
  {isSaving ? 'Saving...' : 'Add Todo'}
</button> */}

        </div>
      )}
    </div>
  );
}

export default App;

