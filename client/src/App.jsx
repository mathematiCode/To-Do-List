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
      <div className="top-0 w-full h-fit flex flex-col items-end">
        <img
          src={
            darkMode
              ? './images/bg-desktop-dark.jpg'
              : './images/bg-desktop-light.jpg'
          }
          className="w-full"
        />
        <Switch
          value={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          className="w-2 z-1 -translate-y-36"
        />
      </div>
      <div className="w-full h-full flex relative justify-center items-center ">
        <div
          className="flex flex-col gap-4 p-8 max-w-md rounded-lg shadow-lg
         bg-container-light text-text-light dark:bg-container-dark dark:text-text-dark"
        >
          <div className="mb-28">
            <input
              type="text"
              placeholder="Add a todo"
              value={newTodo}
              className="flex-1"
              onChange={e => setNewTodo(e.target.value)}
            />
            <button onClick={handleAddTodo} className="relative right-0">
              Add
            </button>
          </div>
          {toDos?.map(todo => (
            <Item key={todo.id} item={todo} setToDos={setToDos} />
          ))}
          <button onClick={handleDeleteAll}>Delete All</button>
        </div>
      </div>
    </div>
  );
}

export default App;
