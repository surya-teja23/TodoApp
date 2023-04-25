import Todo from "./Todo";

export default function CompletedList( { todos , toggleTodo , editTodo , updateTodo , cancelUpdate , deleteTodo }) {
  return ( 
    todos.map(todo => {
      
      return (
          <Todo key={todo.id} 
            todo={todo} 
            toggleTodo={toggleTodo}
            editTodo={editTodo} 
            deleteTodo={deleteTodo} />
      )
    })
  )
}