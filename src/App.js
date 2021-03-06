import React, { useState, useRef, useEffect } from "react";
// import ReactDOM from 'react-dom';
import TodoList from './TodoList.js';
import "./styles.css";
const { v4: uuidv4 } = require('uuid');
// import uuidv4 from 'uuid/v4'



const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])  
  const todoNameRef = useRef()

  // store the todos
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  // get the todos
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])


  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }


  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }


  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === "") return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  return (
    <>
      <div className="headline">DW's TO-DO List</div>
      <hr />
      
        <input ref={todoNameRef} type="text" onKeyPress="if(event.keyCode == 13){handleAddTodo}"/>
        <button onClick={handleAddTodo}>Add Todo</button>
        <button onClick={handleClearTodos}>Clear Complete</button>
      <hr />

      <div className="numLeft">{todos.filter(todo => !todo.complete).length} left! Keep Going!</div>

      <TodoList className="listStyle" todos={todos} toggleTodo={toggleTodo} />
    </>
  )
}

export default App;
