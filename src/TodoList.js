import Todo from "./Todo";
import { RxUpdate } from 'react-icons/rx'
import { GiCancel } from 'react-icons/gi'
import { useState } from "react";

export default function TodoList( { todos , toggleTodo , editTodo , updateTodo , cancelUpdate , deleteTodo }) {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')

  return ( 
    todos.map(todo => {
      
      return (
        todo.isEditing ? 
          <div className="input-group pt-3" style={{maxWidth: '650px'}}>
            <div className="form-floating">
              <input onChange={ e => setTitle(e.target.value)} className="form-control" placeholder="Enter" />
              <label>Enter Updated Todo</label>
            </div>
            <input onChange={ e => setDueDate(e.target.value)} className="form-control" type="date" />
            <button onClick={ title === '' || dueDate === '' ? () => false : () => {
                updateTodo(todo.id,title,dueDate)
                setTitle('')
                setDueDate('')} 
              }
              style={{cursor: title === '' || dueDate === '' ? 'not-allowed' : 'pointer'}} 
              title={title === '' || dueDate === '' ? 'Title and DueDate Can\'t be empty' : 'Update Task'}
              className="btn btn-primary"><RxUpdate fontSize={30} /></button>
            <button title="Cancel Update" onClick={() => cancelUpdate(todo.id)} className="btn btn-danger"><GiCancel fontSize={30} /></button>
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