import './App.scss';
// import ColorBox from './components/ColorBox';
import React, { useEffect, useState } from 'react';
import PostList from './components/PostList';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'I love EF'},
    { id: 2, title: 'We love EF'},
    { id: 3, title: 'They love EF'}
  ])

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function fetchPostList() {
      try { 
        const requestUrl = 'https://js-post-api.herokuapp.com/api/posts?_limit=10&+page=1';
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log(responseJSON);

        const {data} = responseJSON;
        setPostList(data);
      } catch (error) {
        console.log('Fail to fetch post list: ', error.message);
      }
    }

    console.log('post list effect');
    fetchPostList();
  }, [])

  useEffect(() => {
    console.log('todo list effect');
  });

  function handleTodoClick(todo) {
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    console.log('Form submit', formValues);

    // add new todo to current todo list
    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
    };

    const newTodoList = [ ...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  return (
    <div className="app">
      <h1>Welcome to react hooks!</h1>

      <TodoForm onSubmit={handleTodoFormSubmit}/>
      <TodoList todos={todoList} onTodoClick={handleTodoClick}/>

      <PostList posts={postList}/>
    </div>
  );
}

export default App;
