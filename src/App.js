import React, { useState, useEffect } from 'react';
import './App.scss';

const getTodos = () => fetch('https://jsonplaceholder.typicode.com/todos?_limit=8')
  .then(response => response.json());

const App = () => {
  const [todos, setTodos] = useState([]);
  console.log(getTodos(), todos)

  useEffect(() => {
    getTodos().then(setTodos);
  },[]);

  const completeHandler = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        }
      }
      return todo;
    }))
  }

  return (
    <div className="App">
      <div className="wrap">
        <nav className="nav">
          <a href="#allTodos" className="nav__tab nav__tab--active">
            <img src="https://zhenya-mezhueva.github.io/react-todo-list/images/list.png" className="nav__img" alt="list-logo"/>
          </a>
          <a href="#completedTodos" className="nav__tab">
          <img src="https://zhenya-mezhueva.github.io/react-todo-list/images/complete.png" className="nav__img" alt="list-logo"/>
        </a>
        </nav>
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id}>
              <div className="todo">
                <input
                  type="checkbox"
                  id={todo.id}
                  checked={todo.completed}
                  onChange={() => completeHandler(todo.id)}
                />
                <label
                  htmlFor={todo.id}
                  className="todo__label"
                >
                  <span className={todo.completed ? "todo__text todo__text--completed" : "todo__text"}>
                    {todo.title}
                  </span>
                </label>
              </div>
            </li>
          ))}
        </ul>
        <button className="btn icon-fill">+</button>
      </div>
    </div>
  );
}

export default App;
