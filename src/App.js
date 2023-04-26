import React, { useEffect, useRef, useState } from 'react'
import { AiOutlinePlus , AiFillDelete } from 'react-icons/ai'
import TodoList from './TodoList'
import CompletedList from './CompletedList'

export default function App() {
  const [todos, setTodos] = useState([])

  const [completedPercentage, setCompletedPercentage] = useState((todos.filter(todo => todo.completed).length / todos.length) * 100)

  useEffect( () => {
    let savedTodos = JSON.parse(localStorage.getItem('todos'))
    savedTodos.map(todo => todo.isEditing = false)
    if(savedTodos.length) setTodos(savedTodos)
    else setTodos([{
      id:1,
      title:'Watch Sisu',
      dueDate: '28-04-23',
      completed: true,
      isEditing: false
    } , {
      id:2,
      title:'Learn Node',
      dueDate: '28-02-18',
      completed: false,
      isEditing: false
    }])
  } , [])

  useEffect( () => {
    const percentage = (todos.filter(todo => todo.completed).length / todos.length) * 100
    setCompletedPercentage(isNaN(percentage) ? 0 : percentage)

    localStorage.setItem('todos' , JSON.stringify(todos))
  }, [todos])

  const addTodo = (title , dueDate) => {
    if (title === '' || dueDate === '') return
    const id = new Date().getTime()
    setTodos([...todos,{
      id: id,
      title: title,
      dueDate: dueDate,
      completed: false
    }])
  }

  const deleteCompleted = () => {
    setTodos([...todos.filter(todo => !todo.completed)])
  }

  const toggleTodo = id => {
    let newTodos = todos
    let  todo = newTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed

    setTodos([...newTodos])
  }

  const editTodo = id => {
    let newTodos = todos
    let  todo = newTodos.find(todo => todo.id === id)
    todo.isEditing = !todo.isEditing

    setTodos([...newTodos])
  }

  const updateTodo = (id,title,dueDate) => {
    let newTodos = todos
    let  todo = newTodos.find(todo => todo.id === id)

    todo.title = title
    todo.dueDate = dueDate
    todo.isEditing = !todo.isEditing

    setTodos([...newTodos])
  }

  const cancelUpdate = id => {
    let newTodos = todos
    let  todo = newTodos.find(todo => todo.id === id)
    todo.isEditing = !todo.isEditing

    setTodos([...newTodos])
  }

  const deleteTodo = id => {
    setTodos([...todos.filter(todo => todo.id !== id)])
  }

  const [title , setTitle] = useState('')
  const [dueDate , setDueDate] = useState('')

  return (
    <>
      <div className='d-flex align-item-center'>
        <div className='align-self-center input-group pt-3' style={{maxWidth: '650px'}}>
          <div className='form-floating'>
            <input onChange={ e => setTitle(e.target.value)} className='form-control' placeholder='Enter' />
            <label>Enter Todo Title</label>
          </div>
          <input onChange={ e => setDueDate(e.target.value)} className='form-control' type='date' />
          <button style={{cursor: title === '' || dueDate === '' ? 'not-allowed' : 'pointer'}} title={title === '' || dueDate === '' ? 'Title and Duedate can\'t be empty' : 'Add Todo'} onClick={
            title === '' || dueDate === '' ? () => false : () => {
            addTodo(title, dueDate)
            setTitle('')
            setDueDate('')
          }} className='fw-bold btn btn-primary d-flex align-items-center'>
            <AiOutlinePlus style={{color: 'white',fontSize: '30px'}} />
          </button>
          <button 
            title={todos.filter(todo => todo.completed).length ? 'Delete Completed' : 'No Completed Tasks Available'} 
            style={{cursor: !completedPercentage ? 'not-allowed' : 'pointer'}} 
            onClick={
              !completedPercentage ? () => false : deleteCompleted
            } 
            className='btn btn-danger d-flex align-items-center'>
            <AiFillDelete style={{color: 'white',fontSize: '30px'}} />
          </button>
        </div>
        <div title='Completion Percentage' className='mx-auto mt-3 align-self-center fs-4 rounded-circle d-flex align-items-center justify-content-center' style={{
          height: '75px',
          width: '75px',
          background: `conic-gradient(#ffc107 ${completedPercentage*3.6}deg,white 0deg)`
        }}>
          {completedPercentage ? Number.isInteger(completedPercentage) ? completedPercentage.toFixed(0) : completedPercentage.toFixed(2) : 0}%
        </div>
      </div>
      <hr />
      <h1 className='text-decoration-underline'>Todo List</h1>
      <h3>Number of Tasks left todo : {todos.filter(todo => !todo.completed).length}</h3>
      <TodoList 
        todos={todos.filter(todo => !todo.completed)} 
        toggleTodo={toggleTodo}
        editTodo={editTodo} 
        updateTodo={updateTodo}
        cancelUpdate={cancelUpdate}
        deleteTodo={deleteTodo} />
      <hr />
      <h1 className='text-decoration-underline'>Completed List</h1>
      <h3>Number of Tasks completed : {todos.filter(todo => todo.completed).length}</h3>
      <CompletedList 
        todos={todos.filter(todo => todo.completed)} 
        toggleTodo={toggleTodo}
        editTodo={editTodo} 
        updateTodo={updateTodo}
        cancelUpdate={cancelUpdate}
        deleteTodo={deleteTodo} />
    </>
  )
}