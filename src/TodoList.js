import Todo from "./Todo";
import { RxUpdate } from 'react-icons/rx'
import { GiCancel } from 'react-icons/gi'
import { useRef } from "react";

export default function TodoList( { todos , toggleTodo , editTodo , updateTodo , cancelUpdate , deleteTodo }) {
  const title = useRef()
  const dueDate = useRef()

  return ( 
    todos.map(todo => {
      
      return (
        todo.isEditing ? 
          <div className="input-group pt-3 px-3" style={{maxWidth: '650px'}}>
            <div className="form-floating">
              <input ref={title} className="form-control" placeholder="Enter" />
              <label>Enter Updated Todo</label>
            </div>
            <input ref={dueDate} className="form-control" type="date" />
            <button disabled={!title.current.value || !dueDate.current.value} onClick={() => updateTodo(todo.id,title.current.value,dueDate.current.value)} className="btn btn-primary"><RxUpdate fontSize={30} /></button>
            <button onClick={() => cancelUpdate(todo.id)} className="btn btn-danger"><GiCancel fontSize={30} /></button>
          </div>
        :
          <Todo key={todo.id} 
            todo={todo} 
            toggleTodo={toggleTodo}
            editTodo={editTodo} 
            deleteTodo={deleteTodo} />
      )
    })
  )
}