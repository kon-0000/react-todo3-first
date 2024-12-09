import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, toggleTodo, updateTodo }) => {
  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Todo todo={todo} toggleTodo={toggleTodo} updateTodo={updateTodo} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;