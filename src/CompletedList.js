import Todo from "./Todo";
import { RxUpdate } from 'react-icons/rx'
import { GiCancel } from 'react-icons/gi'
import { useRef } from "react";

export default function CompletedList( { todos , toggleTodo , editTodo , updateTodo , cancelUpdate , deleteTodo }) {
  const title = useRef()
  const dueDate = useRef()

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