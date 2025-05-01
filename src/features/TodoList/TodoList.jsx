// function TodoList(){
//     const todos = [
//         {id: 1, title: "review resources"},
//         {id: 2, title: "take notes"},
//         {id: 3, title: "code out app"},
//     ]
//     return(
//         <ul>
//         {todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
//         </ul>



//     );
// };
// export default TodoList;
// import TodoListItem from "./TodoListItem";
// function TodoList(){
//     const todos = [
//         {id: 1, title: "review resources"},
//         {id: 2, title: "take notes"},
//         {id: 3, title: "code out app"},
//     ]
//     return(
//         <ul>
//         {todos.map((todo) =>( <TodoListItem todo={todo } key={todo.id}/>))}
//         </ul>



//     );
// };
// export default TodoList;

// import TodoListItem from "./TodoListItem";

// function TodoList({ todoList }) {
//   return (
//     <>
//       {todoList.length === 0 ? (
//         <p>Add todo above to get started</p>
//       ) : (
//         <ul>
//           {todoList.map((todo) => (
//             <TodoListItem todo={todo} key={todo.id} />
//           ))}
//         </ul>
//       )}
//     </>
//   );
// }

// export default TodoList;


import TodoListItem from "./TodoListItem";

function TodoList({ todoList, onCompleteTodo, onUpdateTodo }) {
  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted); //  hide completed

  return (
    <>
      {filteredTodoList.length === 0 ? (
        <p>Add todo above to get started</p>
      ) : (
        <ul>
          {filteredTodoList.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TodoList;
