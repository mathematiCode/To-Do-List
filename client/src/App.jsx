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
        .then(res => res.json())
        .then(data => setToDos(data.toDos));
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

  const handleAddTodo = () => {
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
      <div className="w-full h-auto flex relative justify-center items-center ">
        <div
          className="flex flex-col gap-4 p-8 max-w-md rounded-lg shadow-lg -translate-y-28
         bg-container-light text-text-light dark:bg-container-dark dark:text-text-dark justify-start"
        >
          <div className="mb-28">
            <input
              type="text"
              placeholder="Add a todo"
              value={newTodo}
              className="flex-1"
              onChange={e => setNewTodo(e.target.value)}
            />
            <button
              onClick={handleAddTodo}
              className="relative right-0 self-end"
            >
              Add
            </button>
          </div>
          {toDos?.map(todo => (
            <Item key={todo.id} item={todo} setToDos={setToDos} />
          ))}
          {/* <button onClick={handleDeleteAll}>Delete All</button> */}
          <div className="w-fit-content h-fit flex justify-center items-center text-sm">
            <span> {toDos.length} items left</span>
            <button> All</button>
            <button> Active</button>
            <button> Completed</button>
            <button> Clear Completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
