import React, { useState ,useRef, useEffect} from 'react'
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid';

const App =()=> {
  const [todos,setTodos]=useState(()=>{
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  })

  const [filter,setFilter]=useState('すべて')

  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos))
  },[todos])

  const todoNameRef =useRef();

  const handleAddTodo =()=>{
    //Todoの追加
    const name =todoNameRef.current.value;
    if(name === "")return
    setTodos((prevTodos)=>{
      return[...prevTodos,{id:uuidv4(),name:name,completed:false}]
    })
    todoNameRef.current.value =null;
  }

  const toggleTodo =(id)=>{
    const newTodos=[...todos]
    const todo = newTodos.find((todo) => todo.id === id)
    todo.completed = !todo.completed
    setTodos(newTodos);
  }

  const handleClear =()=>{
    const newTodos =todos.filter((todo) => !todo.completed)
    setTodos(newTodos)
  }

  const updateTodo = (id, newName) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, name: newName } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === '完了') return todo.status === '完了';
    if (filter === '未着手') return todo.status === '未着手';
    if (filter === '作業中') return todo.status === '作業中'; // 作業中のフィルター
    return true; // '全て' の場合は全てのタスクを表示
  });

  

  return (
    <>

      <input type='text' ref={todoNameRef}/>
      <button onClick={handleAddTodo}>追加</button>
      <button onClick={handleClear}>完了を削除</button>
      <select onChange={(e) => setFilter(e.target.value)}>
              <option >全て</option>
              <option >未着手</option>
              <option >作業中</option>
              <option >完了</option>
      </select>

      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} updateTodo={updateTodo}/>
      <div>残りのタスク:{todos.filter((todo)=> !todo.completed).length}</div>

    </>

)
  
}

export default App;
