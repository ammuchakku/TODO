import React from 'react'
import './Todo.css'
import { useState, useRef, useEffect } from 'react';
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function Todo() {
  const [Todo, setTodo] = useState('')
  const [todos, settodos] = useState([])
  const [editId , setEditID] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const addTodo = () => {
    if(Todo !== ''){
      settodos([...todos, { list : Todo , id : Date.now() , status : false }])
    console.log(todos)
    setTodo('')
  }
  if(editId){
    const EditTodo = todos.find((Todo)=>Todo.id == editId)
    const updateTodo = todos.map((To)=>To.id === EditTodo.id
    ? (To = {id : To.id , list : Todo})
    : (To = {id : To.id , list : To.list}))
    settodos(updateTodo)
    setEditID(0)
    setTodo('')
  }
}
  
  const inputRef = useRef('null')
  useEffect(() => {
    inputRef.current.focus();
  });

  const onDelete = (id) =>{
   settodos(todos.filter((To) => To.id !== id))
  }
  const onComplete = (id) =>{
let complete = todos.map((list)=>{
  if(list.id === id){
    return ({...list , status : !list.status })
  }
  return list
})
settodos(complete)
  }

  const onEdit = (id) =>{
  const EditTodo = todos.find((To)=> To.id === id)
  setTodo(EditTodo.list)
  setEditID(EditTodo.id)

  }

  return (
    <div className='container'>
      <h2>TODO APP</h2>
      <form className='form-group' onSubmit={handleSubmit}>
        <input type="text" value={Todo} ref={inputRef} placeholder='Enter your TODO' className='form-control' onChange={(event) => setTodo(event.target.value)} />
        <button onClick={addTodo}> {editId ? 'EDIT' : 'ADD'} </button>
      </form>
      <div className='list'>
        <ul>{
          todos.map((To) => (
            <li className='list-items'>
              <div className='list-item-list' id={To.status  ? 'list-item' : ''}>{To.list}</div>
              <span>
                <IoMdDoneAll className='list-item-icons' id='complete' title='Complete' onClick={()=>onComplete(To.id)} />
                <FiEdit className='list-item-icons' id='edit' title='Edit' onClick={()=>onEdit(To.id)} />
                <MdDelete className='list-item-icons' id='delete' title='Delete' onClick={()=>onDelete(To.id)} />
              </span>
            </li>
          ))
        }

        </ul>
      </div>
    </div>
  )
}

export default Todo
