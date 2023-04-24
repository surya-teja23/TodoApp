import React, { useEffect, useRef, useState } from 'react'
import { AiOutlinePlus , AiFillDelete } from 'react-icons/ai'
import TodoList from './TodoList'

export default function App() {
  const [todos, setTodos] = useState([
    {
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
    }
  ])

  const [completedPercentage, setCompletedPercentage] = useState((todos.filter(todo => todo.completed).length / todos.length) * 100)

  useEffect( () => {
    const percentage = (todos.filter(todo => todo.completed).length / todos.length) * 100
    setCompletedPercentage(isNaN(percentage) ? 0 : percentage)
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
    if(title === '' || dueDate === '') {
      todo.isEditing = !todo.isEditing
      setTodos([...newTodos])
      return
    }
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

  const title = useRef()
  const dueDate = useRef()

  return (
    <>
      <div className='d-flex align-item-center'>
        <div className='align-self-center input-group pt-3 px-3' style={{maxWidth: '650px'}}>
          <div className='form-floating'>
            <input ref={title} className='form-control' placeholder='Enter' />
            <label>Enter Todo Title</label>
          </div>
          <input ref={dueDate} className='form-control' type='date' />
          <button onClick={() => {
            addTodo(title.current.value, dueDate.current.value)
            title.current.value = ''
            dueDate.current.value = ''
          }} className='fw-bold btn btn-primary d-flex align-items-center'><AiOutlinePlus style={{color: 'white',fontSize: '30px'}} /></button>
          <button disabled={!completedPercentage} onClick={deleteCompleted} className='btn btn-danger d-flex align-items-center'><AiFillDelete style={{color: 'white',fontSize: '30px'}} /></button>
        </div>
        <div className='mt-3 align-self-center fs-4 rounded-circle border border-dark d-flex align-items-center justify-content-center' style={{
          height: '100px',
          width: '100px',
          background: `conic-gradient(#0d6efd88 ${completedPercentage*3.6}deg,white 0deg)`
        }}>
          {completedPercentage ? completedPercentage === 100 ? 100 : completedPercentage.toFixed(2) : 0}%
        </div>
      </div>
      <hr />
      <h1 className='px-3'>Todo List</h1>
      <TodoList 
        todos={todos} 
        toggleTodo={toggleTodo}
        editTodo={editTodo} 
        updateTodo={updateTodo}
        cancelUpdate={cancelUpdate}
        deleteTodo={deleteTodo} />
    </>
  )
}
