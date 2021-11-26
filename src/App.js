import './App.scss';
import ColorBox from './components/ColorBox';
import React, { useState } from 'react';
import TodoList from './components/TodoList';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'I love EF'},
    { id: 2, title: 'We love EF'},
    { id: 3, title: 'They love EF'}
  ])

  function handleTodoClick(todo) {
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  return (
    <div className="app">
      <h1>Welcome to react hooks!</h1>

      <ColorBox />
      <TodoList todos={todoList} onTodoClick={handleTodoClick}/>
    </div>
  );
}

export default App;
