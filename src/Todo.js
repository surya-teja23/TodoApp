import React from "react"
import { FaTrash } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'

export default function Todo({ todo , toggleTodo , editTodo , deleteTodo }) {
  let { id , title , dueDate , completed } = todo
  return (
    <div className="input-group ms-3 mt-3" key={id}>
      <div className="input-group-text">
        <input onChange={()=>toggleTodo(id)} checked={completed} id={id} className="form-check-input" type="checkbox" />
      </div>
      <div className="input-group-text">
        <label className={completed ? 'text-decoration-line-through' : ''} htmlFor={id}>{title} &nbsp; : &nbsp; {dueDate}</label>
      </div>
      <button title={completed ? 'Edit Not Allowed on Completed Task' : 'Edit Task'} 
        style={{cursor: completed ? 'not-allowed' : 'default'}}
        onClick={
          completed ? () => false : () => editTodo(id)
        } 
        className="d-flex align-items-center btn btn-primary"><MdEdit style={{color: 'white'}} fontSize={30} /></button>
      <button title="Delete Task" onClick={() => deleteTodo(id)} className="d-flex align-items-center btn btn-danger"><FaTrash fontSize={30} /></button>
    </div>
  )
}