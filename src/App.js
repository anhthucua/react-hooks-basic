import './App.scss';
// import ColorBox from './components/ColorBox';
import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import PostList from './components/PostList';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Pagination from './components/Pagination';
import PostFiltersForm from './components/PostFiltersForm';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'I love EF'},
    { id: 2, title: 'We love EF'},
    { id: 3, title: 'They love EF'}
  ])

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 11
  })

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    title_like: ''
  })

  useEffect(() => {
    async function fetchPostList() {
      try { 
        //- _limit=10&_page=1
        const paramsString = queryString.stringify(filters); // bien tu object sang chuoi
        const requestUrl = `https://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log(responseJSON);

        const {data, pagination} = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Fail to fetch post list: ', error.message);
      }
    }

    console.log('post list effect');
    fetchPostList();
  }, [filters])

  useEffect(() => {
    console.log('todo list effect');
  });

  function handlePageChange(newPage) {
    console.log('Mew page ', newPage);
    setFilters({
      ...filters,
      _page: newPage,
    })
  }

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

  function handleFiltersChange(newFilters) {
    console.log('New filters', newFilters);
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    })
  }

  return (
    <div className="app">
      <h1>Welcome to react hooks!</h1>
      <PostFiltersForm 
        onSubmit={handleFiltersChange}
      />

      <TodoForm onSubmit={handleTodoFormSubmit}/>
      <TodoList todos={todoList} onTodoClick={handleTodoClick}/>

      <PostList posts={postList}/>
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
