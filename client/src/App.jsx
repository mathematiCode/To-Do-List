import { useState, useEffect } from 'react';
import { Switch } from 'antd';
import Item from './components/item';

function App() {
  const [toDos, setToDos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // use local storage
  const [darkMode, setDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    try {
      fetch('https://to-do-list-backend-8utj.onrender.com/api/todos')
        .then(res => {
          console.log(`res is`, res);
          return res.json();
        })
        .then(data => {
          console.log(`data is`, data);
          setToDos(data.toDos);
        });
      console.log(toDos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAddTodo = event => {
    event.preventDefault();
    if (newTodo.trim() === '') {
      return;
    }
    fetch('https://to-do-list-backend-8utj.onrender.com/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTodo, completed: false }),
    })
      .then(res => res.json())
      .then(data => setToDos(data.toDos));
    setNewTodo('');
  };

  const handleDeleteAll = async () => {
    if (toDos.length === 0) {
      return;
    }
    await toDos.forEach(todo => {
      {
        console.log('deleting', todo.id);
        fetch(
          `https://to-do-list-backend-8utj.onrender.com/api/todos/${todo.id}`,
          {
            method: 'DELETE',
          }
        );
      }
    });
    fetch('https://to-do-list-backend-8utj.onrender.com/api/todos')
      .then(res => res.json())
      .then(data => setToDos(data.toDos));
    console.log(toDos);
  };

  return (
    <div className="bg-bg-light dark:bg-bg-dark h-full">
      <div
        style={{ lineHeight: '0', height: 'min-content' }}
        className="top-0 w-full flex flex-col gap-0 items-end"
      >
        <img
          src={
            darkMode
              ? './images/bg-desktop-dark.jpg'
              : './images/bg-desktop-light.jpg'
          }
          className="w-full block"
        />
        <div className="w-full h-fit flex justify-around items-center z-1 -translate-y-44">
          <h1 className="text-5xl tracking-widest">TODO</h1>
          <Switch
            value={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="w-2 "
          />
        </div>
      </div>
      <div className="w-fit justify-self-center h-auto flex flex-col relative -translate-y-40 gap-4 justify-center items-center text-2xl">
        <form
          className="flex justify-between items-center gap-4 px-8 py-2 rounded-lg shadow-lg w-full
         text-text-light hover:text-hover-light dark:text-text-dark hover:dark:text-hover-dark
         bg-container-light dark:bg-container-dark "
        >
          <input
            type="text"
            placeholder="Add a todo"
            value={newTodo}
            className="flex-1"
            onChange={e => setNewTodo(e.target.value)}
          />
          <button
            type="submit"
            onClick={handleAddTodo}
            className="relative right-0 self-end"
          >
            Add
          </button>
        </form>
        <div
          className="flex flex-col gap-4 p-8 rounded-lg shadow-lg w-full
         bg-container-light dark:bg-container-dark justify-start"
        >
          {toDos?.map(todo => (
            <Item key={todo.id} item={todo} setToDos={setToDos} />
          ))}
          {/* <button onClick={handleDeleteAll}>Delete All</button> */}
          <div className="w-fit-content h-fit flex justify-center items-center text-1xl gap-4">
            <span className="text-dark-grayish-blue text-base">
              {' '}
              {toDos?.length} items left
            </span>
            <button className="btn"> All</button>
            <button className="btn"> Active</button>
            <button className="btn"> Completed</button>
            <button className="btn" onClick={handleDeleteAll}>
              {' '}
              Clear Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
